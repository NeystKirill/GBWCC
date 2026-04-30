import { createFileRoute } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { authFetch } from '@/lib/auth-fetch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit, Trash, Plus, Upload } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export const Route = createFileRoute('/_authenticated/partners/')({
  component: PartnersPage,
})

const LANGS = ['ru', 'en', 'kk'] as const
type Lang = typeof LANGS[number]

const CATEGORIES = [
  { value: 'intl', label: 'Международные' },
  { value: 'corp', label: 'Корпоративные' },
  { value: 'natl', label: 'Национальные' },
  { value: 'inst', label: 'Институциональные' },
]

function emptyForm() {
  return {
    name: '', url: '', category: 'intl', sort_order: 0, published: true,
    full_name: { ru: '', en: '', kk: '' } as Record<Lang, string>,
    rep: { ru: '', en: '', kk: '' } as Record<Lang, string>,
    logo_url: '',
  }
}

function PartnersPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editItem, setEditItem] = useState<any>(null)
  const [form, setForm] = useState(emptyForm())
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const logoRef = useRef<HTMLInputElement>(null)

  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/partners?limit=500')
      if (res.ok) { const data = await res.json(); setItems(data.items || data || []) }
    } catch { toast.error('Ошибка загрузки') } finally { setLoading(false) }
  }

  const openCreate = () => { setEditItem(null); setForm(emptyForm()); setDialogOpen(true) }

  const openEdit = (item: any) => {
    setEditItem(item)
    setForm({
      name: item.name || '',
      url: item.url || '',
      category: item.category || item.type || 'intl',
      sort_order: item.sort_order || 0,
      published: item.published !== false,
      full_name: { ru: item.full_name?.ru || '', en: item.full_name?.en || '', kk: item.full_name?.kk || '' },
      rep: { ru: item.rep?.ru || '', en: item.rep?.en || '', kk: item.rep?.kk || '' },
      logo_url: item.logo_url || item.logo || '',
    })
    setDialogOpen(true)
  }

  const setLangField = (field: string, lang: Lang, val: string) =>
    setForm(f => ({ ...f, [field]: { ...(f as any)[field], [lang]: val } }))

  const handleSave = async () => {
    setSaving(true)
    try {
      const url = editItem ? `/api/partners/${editItem.id || editItem._id}` : '/api/partners'
      const res = await authFetch(url, {
        method: editItem ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(await res.text())
      toast.success(editItem ? 'Сохранено' : 'Создано')
      setDialogOpen(false); fetchItems()
    } catch (e: any) { toast.error(e.message) } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await authFetch(`/api/partners/${deleteId}`, { method: 'DELETE' })
      toast.success('Удалено'); fetchItems()
    } catch { toast.error('Ошибка') } finally { setDeleteId(null) }
  }

  const uploadLogo = async (file: File) => {
    if (!editItem) { toast.error('Сначала сохраните партнёра'); return }
    setUploading(true)
    try {
      const fd = new FormData(); fd.append('logo', file)
      const res = await authFetch(`/api/partners/${editItem.id || editItem._id}/logo`, {
        method: 'POST', body: fd,
      })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      setForm(f => ({ ...f, logo_url: data.logo_url || data.logo || '' }))
      setEditItem((prev: any) => ({ ...prev, logo_url: data.logo_url || data.logo || '' }))
      toast.success('Логотип загружен')
    } catch (e: any) { toast.error(e.message) } finally { setUploading(false) }
  }

  const catLabel = (cat: string) => CATEGORIES.find(c => c.value === cat)?.label || cat

  return (
    <>
      <header className='flex items-center justify-between border-b px-6 py-4'>
        <h1 className='text-2xl font-bold tracking-tight'>Партнёры</h1>
        <div className='flex items-center gap-4'><ThemeSwitch /><ProfileDropdown /></div>
      </header>

      <Main>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold'>Управление партнёрами</h2>
          <Button onClick={openCreate}><Plus className='mr-2 h-4 w-4' />Добавить</Button>
        </div>

        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-14'>Лого</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Полное название (RU)</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className='w-24'>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item: any) => (
                <TableRow key={item.id || item._id}>
                  <TableCell>
                    {(item.logo_url || item.logo) && <img src={item.logo_url || item.logo} alt='' className='h-8 w-12 object-contain' />}
                  </TableCell>
                  <TableCell className='font-medium'>{item.name}</TableCell>
                  <TableCell className='max-w-xs truncate'>{item.full_name?.ru}</TableCell>
                  <TableCell>{catLabel(item.category || item.type || '')}</TableCell>
                  <TableCell className='max-w-xs truncate text-sm text-muted-foreground'>{item.url}</TableCell>
                  <TableCell>
                    <Badge variant={item.published !== false ? 'default' : 'secondary'}>
                      {item.published !== false ? 'Активен' : 'Скрыт'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className='flex gap-1'>
                      <Button variant='ghost' size='icon' onClick={() => openEdit(item)}><Edit className='h-4 w-4' /></Button>
                      <Button variant='ghost' size='icon' className='text-destructive' onClick={() => setDeleteId(item.id || item._id)}><Trash className='h-4 w-4' /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && !loading && (
                <TableRow><TableCell colSpan={7} className='text-center py-8 text-muted-foreground'>Нет данных</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>{editItem ? 'Редактировать партнёра' : 'Новый партнёр'}</DialogTitle>
            <DialogDescription>{editItem ? 'Измените поля и сохраните.' : 'Заполните поля для нового партнёра.'}</DialogDescription>
          </DialogHeader>

          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-3'>
              <div><Label>Короткое название</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div><Label>URL сайта</Label><Input value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} placeholder='https://' /></div>
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <Label>Категория</Label>
                <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Порядок сортировки</Label><Input type='number' value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: +e.target.value }))} /></div>
            </div>

            <div className='flex items-center gap-2'>
              <Switch checked={form.published} onCheckedChange={v => setForm(f => ({ ...f, published: v }))} />
              <Label>Опубликовано</Label>
            </div>

            <Tabs defaultValue='ru'>
              <TabsList><TabsTrigger value='ru'>RU</TabsTrigger><TabsTrigger value='en'>EN</TabsTrigger><TabsTrigger value='kk'>KK</TabsTrigger></TabsList>
              {LANGS.map(lang => (
                <TabsContent key={lang} value={lang} className='space-y-3'>
                  <div><Label>Полное название</Label><Input value={form.full_name[lang]} onChange={e => setLangField('full_name', lang, e.target.value)} /></div>
                  <div><Label>Представитель</Label><Input value={form.rep[lang]} onChange={e => setLangField('rep', lang, e.target.value)} /></div>
                </TabsContent>
              ))}
            </Tabs>

            <div>
              <Label>Логотип</Label>
              <div className='mt-1 flex items-center gap-3'>
                {form.logo_url && <img src={form.logo_url} alt='logo' className='h-12 w-20 object-contain rounded border p-1' />}
                <input ref={logoRef} type='file' accept='image/*' className='hidden' onChange={e => e.target.files?.[0] && uploadLogo(e.target.files[0])} />
                <Button type='button' variant='outline' size='sm' disabled={uploading || !editItem} onClick={() => logoRef.current?.click()}>
                  <Upload className='mr-2 h-4 w-4' />{uploading ? 'Загрузка...' : 'Загрузить логотип'}
                </Button>
                {!editItem && <span className='text-xs text-muted-foreground'>Сначала сохраните запись</span>}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant='outline' onClick={() => setDialogOpen(false)}>Отмена</Button>
            <Button onClick={handleSave} disabled={saving}>{saving ? 'Сохранение...' : 'Сохранить'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={v => !v && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить партнёра?</AlertDialogTitle>
            <AlertDialogDescription>Это действие необратимо.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className='bg-destructive text-destructive-foreground hover:bg-destructive/90'>Удалить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
