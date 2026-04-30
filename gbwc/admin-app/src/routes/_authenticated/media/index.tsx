import { createFileRoute } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { authFetch } from '@/lib/auth-fetch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit, Trash, Plus, Upload, Link as LinkIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export const Route = createFileRoute('/_authenticated/media/')({
  component: MediaPage,
})

const LANGS = ['ru', 'en', 'kk'] as const
type Lang = typeof LANGS[number]

const TYPES = [
  { value: 'intl', label: 'Международные' },
  { value: 'natl', label: 'Национальные' },
  { value: 'kz', label: 'На казахском' },
  { value: 'all', label: 'Общие' },
]

function emptyForm() {
  return {
    type: 'intl', url: '', source: '', published: true,
    title: { ru: '', en: '', kk: '' } as Record<Lang, string>,
    date: { ru: '', en: '', kk: '' } as Record<Lang, string>,
    image: '',
  }
}

function MediaPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editItem, setEditItem] = useState<any>(null)
  const [form, setForm] = useState(emptyForm())
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const imgRef = useRef<HTMLInputElement>(null)
  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/media?limit=500')
      if (res.ok) { const data = await res.json(); setItems(data.items || data || []) }
    } catch { toast.error('Ошибка загрузки') } finally { setLoading(false) }
  }

  const openCreate = () => { setEditItem(null); setForm(emptyForm()); setDialogOpen(true) }

  const openEdit = (item: any) => {
    setEditItem(item)
    setForm({
      type: item.type || 'intl',
      url: item.url || '',
      source: item.source || '',
      published: item.published !== false,
      title: { ru: item.title?.ru || '', en: item.title?.en || '', kk: item.title?.kk || '' },
      date: { ru: item.date?.ru || (typeof item.date === 'string' ? item.date : ''), en: item.date?.en || '', kk: item.date?.kk || '' },
      image: item.image || item.thumb || '',
    })
    setDialogOpen(true)
  }

  const setLangField = (field: string, lang: Lang, val: string) =>
    setForm(f => ({ ...f, [field]: { ...(f as any)[field], [lang]: val } }))

  const handleSave = async () => {
    setSaving(true)
    try {
      const apiUrl = editItem ? `/api/media/${editItem.id || editItem._id}` : '/api/media'
      const res = await authFetch(apiUrl, {
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
      await authFetch(`/api/media/${deleteId}`, { method: 'DELETE' })
      toast.success('Удалено'); fetchItems()
    } catch { toast.error('Ошибка') } finally { setDeleteId(null) }
  }

  const uploadImage = async (file: File) => {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await authFetch('/api/uploads/single?folder=media', {
        method: 'POST',
        body: fd,
      })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      setForm(f => ({ ...f, image: data.url || '' }))
      toast.success('Изображение загружено')
    } catch (e: any) { toast.error(e.message) } finally { setUploading(false) }
  }

  const typeLabel = (t: string) => TYPES.find(x => x.value === t)?.label || t

  return (
    <>
      <header className='flex items-center justify-between border-b px-6 py-4'>
        <h1 className='text-2xl font-bold tracking-tight'>СМИ / Публикации</h1>
        <div className='flex items-center gap-4'><ThemeSwitch /><ProfileDropdown /></div>
      </header>

      <Main>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold'>Управление публикациями ({items.length})</h2>
          <Button onClick={openCreate}><Plus className='mr-2 h-4 w-4' />Добавить</Button>
        </div>

        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-14'>Фото</TableHead>
                <TableHead>Заголовок (RU)</TableHead>
                <TableHead>Источник</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className='w-24'>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item: any) => (
                <TableRow key={item.id || item._id}>
                  <TableCell>
                    {(item.image || item.thumb) && (
                      <img src={item.image || item.thumb} alt='' className='h-10 w-14 object-cover rounded' />
                    )}
                  </TableCell>
                  <TableCell className='max-w-xs'>
                    <div className='line-clamp-2 text-sm'>{item.title?.ru || (typeof item.title === 'string' ? item.title : '—')}</div>
                  </TableCell>
                  <TableCell className='text-sm text-muted-foreground'>{item.source}</TableCell>
                  <TableCell>{typeLabel(item.type || '')}</TableCell>
                  <TableCell className='text-sm'>{item.date?.ru || (typeof item.date === 'string' ? item.date : '')}</TableCell>
                  <TableCell>
                    <Badge variant={item.published !== false ? 'default' : 'secondary'}>
                      {item.published !== false ? 'Опубликовано' : 'Скрыто'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className='flex gap-1'>
                      {item.url && <Button variant='ghost' size='icon' asChild><a href={item.url} target='_blank' rel='noreferrer'><LinkIcon className='h-4 w-4' /></a></Button>}
                      <Button variant='ghost' size='icon' onClick={() => openEdit(item)}><Edit className='h-4 w-4' /></Button>
                      <Button variant='ghost' size='icon' className='text-destructive' onClick={() => setDeleteId(item.id || item._id)}><Trash className='h-4 w-4' /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && !loading && (
                <TableRow><TableCell colSpan={7} className='text-center py-8 text-muted-foreground'>Нет публикаций</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>{editItem ? 'Редактировать публикацию' : 'Новая публикация'}</DialogTitle>
            <DialogDescription>{editItem ? 'Измените поля и сохраните.' : 'Заполните поля для новой публикации.'}</DialogDescription>
          </DialogHeader>

          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <Label>Тип</Label>
                <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{TYPES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Источник (издание)</Label><Input value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))} placeholder='Forbes, 24.kz...' /></div>
            </div>

            <div><Label>Ссылка на статью</Label><Input value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} placeholder='https://' /></div>

            <div className='flex items-center gap-2'>
              <Switch checked={form.published} onCheckedChange={v => setForm(f => ({ ...f, published: v }))} />
              <Label>Опубликовано</Label>
            </div>

            <Tabs defaultValue='ru'>
              <TabsList><TabsTrigger value='ru'>RU</TabsTrigger><TabsTrigger value='en'>EN</TabsTrigger><TabsTrigger value='kk'>KK</TabsTrigger></TabsList>
              {LANGS.map(lang => (
                <TabsContent key={lang} value={lang} className='space-y-3'>
                  <div><Label>Заголовок</Label><Textarea rows={2} value={form.title[lang]} onChange={e => setLangField('title', lang, e.target.value)} /></div>
                  <div><Label>Дата</Label><Input value={form.date[lang]} onChange={e => setLangField('date', lang, e.target.value)} placeholder='15 марта 2025' /></div>
                </TabsContent>
              ))}
            </Tabs>

            {/* Image */}
            <div>
              <Label>Изображение</Label>
              <div className='mt-1 flex items-center gap-3'>
                {form.image && <img src={form.image} alt='' className='h-16 w-24 object-cover rounded border' />}
                <input ref={imgRef} type='file' accept='image/*' className='hidden' onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0])} />
                <Button type='button' variant='outline' size='sm' disabled={uploading} onClick={() => imgRef.current?.click()}>
                  <Upload className='mr-2 h-4 w-4' />{uploading ? 'Загрузка...' : 'Загрузить'}
                </Button>
                <span className='text-xs text-muted-foreground'>или вставьте URL ниже</span>
              </div>
              <Input className='mt-2' value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder='https://... или /uploads/...' />
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
            <AlertDialogTitle>Удалить публикацию?</AlertDialogTitle>
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
