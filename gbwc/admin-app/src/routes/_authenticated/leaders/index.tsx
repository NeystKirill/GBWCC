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
import { Edit, Trash, Plus, Upload } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/_authenticated/leaders/')({
  component: LeadersPage,
})

const LANGS = ['ru', 'en', 'kk'] as const
type Lang = typeof LANGS[number]

function emptyForm() {
  return {
    initials: '', index: 0, sort_order: 0, published: true,
    photo: '',
    name: { ru: '', en: '', kk: '' } as Record<Lang, string>,
    positions: { ru: '', en: '', kk: '' } as Record<Lang, string>,
    bio: { ru: '', en: '', kk: '' } as Record<Lang, string>,
    decree: { ru: '', en: '', kk: '' } as Record<Lang, string>,
  }
}

function LeadersPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editItem, setEditItem] = useState<any>(null)
  const [form, setForm] = useState(emptyForm())
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const photoRef = useRef<HTMLInputElement>(null)
  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/leaders?limit=200')
      if (res.ok) { const data = await res.json(); setItems(data.items || data || []) }
    } catch { toast.error('Ошибка загрузки') } finally { setLoading(false) }
  }

  const toStr = (val: any, lang: Lang) => {
    if (!val) return ''
    if (typeof val === 'string') return val
    if (Array.isArray(val[lang])) return val[lang].join('\n')
    return val[lang] || ''
  }

  const openCreate = () => { setEditItem(null); setForm(emptyForm()); setDialogOpen(true) }

  const openEdit = (item: any) => {
    setEditItem(item)
    const d = item.data || item
    setForm({
      initials: item.initials || d.initials || '',
      index: item.index || d.index || 0,
      sort_order: item.sort_order || 0,
      published: item.published !== false,
      photo: item.photo || '',
      name: { ru: toStr(d.name || item.name, 'ru'), en: toStr(d.name || item.name, 'en'), kk: toStr(d.name || item.name, 'kk') },
      positions: { ru: toStr(d.positions || item.positions, 'ru'), en: toStr(d.positions || item.positions, 'en'), kk: toStr(d.positions || item.positions, 'kk') },
      bio: { ru: toStr(d.bio || item.bio, 'ru'), en: toStr(d.bio || item.bio, 'en'), kk: toStr(d.bio || item.bio, 'kk') },
      decree: { ru: toStr(d.decree || item.decree, 'ru'), en: toStr(d.decree || item.decree, 'en'), kk: toStr(d.decree || item.decree, 'kk') },
    })
    setDialogOpen(true)
  }

  const setLangField = (field: string, lang: Lang, val: string) =>
    setForm(f => ({ ...f, [field]: { ...(f as any)[field], [lang]: val } }))

  const splitLines = (s: string) => s.split('\n').map(x => x.trim()).filter(Boolean)

  const handleSave = async () => {
    setSaving(true)
    try {
      const body = {
        ...form,
        data: {
          name: form.name,
          positions: {
            ru: splitLines(form.positions.ru),
            en: splitLines(form.positions.en),
            kk: splitLines(form.positions.kk),
          },
          bio: {
            ru: splitLines(form.bio.ru),
            en: splitLines(form.bio.en),
            kk: splitLines(form.bio.kk),
          },
          decree: form.decree,
          initials: form.initials,
          index: form.index,
        }
      }
      const url = editItem ? `/api/leaders/${editItem.id || editItem._id}` : '/api/leaders'
      const res = await authFetch(url, {
        method: editItem ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error(await res.text())
      toast.success(editItem ? 'Сохранено' : 'Создано')
      setDialogOpen(false); fetchItems()
    } catch (e: any) { toast.error(e.message) } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await authFetch(`/api/leaders/${deleteId}`, { method: 'DELETE' })
      toast.success('Удалено'); fetchItems()
    } catch { toast.error('Ошибка') } finally { setDeleteId(null) }
  }

  const uploadPhoto = async (file: File) => {
    if (!editItem) { toast.error('Сначала сохраните запись'); return }
    setUploading(true)
    try {
      const fd = new FormData(); fd.append('photo', file)
      const res = await authFetch(`/api/leaders/${editItem.id || editItem._id}/photo`, {
        method: 'POST', body: fd,
      })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      setForm(f => ({ ...f, photo: data.photo || '' }))
      setEditItem((prev: any) => ({ ...prev, photo: data.photo || '' }))
      toast.success('Фото загружено')
    } catch (e: any) { toast.error(e.message) } finally { setUploading(false) }
  }

  const getName = (item: any) => item.data?.name?.ru || item.name?.ru || item.data?.name?.en || item.name?.en || '—'
  const getRole = (item: any) => {
    const pos = item.data?.positions?.ru || item.positions?.ru
    return Array.isArray(pos) ? pos[0] : (pos || '—')
  }

  return (
    <>
      <header className='flex items-center justify-between border-b px-6 py-4'>
        <h1 className='text-2xl font-bold tracking-tight'>Основатели / Лидеры</h1>
        <div className='flex items-center gap-4'><ThemeSwitch /><ProfileDropdown /></div>
      </header>

      <Main>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold'>Управление лидерами</h2>
          <Button onClick={openCreate}><Plus className='mr-2 h-4 w-4' />Добавить</Button>
        </div>

        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-14'>Фото</TableHead>
                <TableHead>Имя (RU)</TableHead>
                <TableHead>Должность (RU)</TableHead>
                <TableHead>Инициалы</TableHead>
                <TableHead>Порядок</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className='w-24'>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item: any) => (
                <TableRow key={item.id || item._id}>
                  <TableCell>
                    {item.photo && <img src={item.photo} alt='' className='h-10 w-10 rounded-full object-cover' />}
                  </TableCell>
                  <TableCell className='font-medium'>{getName(item)}</TableCell>
                  <TableCell className='max-w-xs truncate text-sm'>{getRole(item)}</TableCell>
                  <TableCell>{item.initials || item.data?.initials}</TableCell>
                  <TableCell>{item.sort_order}</TableCell>
                  <TableCell>
                    <Badge variant={item.published !== false ? 'default' : 'secondary'}>
                      {item.published !== false ? 'Опубликован' : 'Скрыт'}
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
            <DialogTitle>{editItem ? 'Редактировать лидера' : 'Новый лидер'}</DialogTitle>
            <DialogDescription>{editItem ? 'Измените поля и сохраните.' : 'Заполните поля для нового лидера.'}</DialogDescription>
          </DialogHeader>

          <div className='space-y-4'>
            {/* Photo */}
            <div>
              <Label>Фотография</Label>
              <div className='mt-1 flex items-center gap-3'>
                {form.photo && <img src={form.photo} alt='' className='h-16 w-16 rounded-full object-cover border' />}
                <input ref={photoRef} type='file' accept='image/*' className='hidden' onChange={e => e.target.files?.[0] && uploadPhoto(e.target.files[0])} />
                <Button type='button' variant='outline' size='sm' disabled={uploading || !editItem} onClick={() => photoRef.current?.click()}>
                  <Upload className='mr-2 h-4 w-4' />{uploading ? 'Загрузка...' : 'Загрузить фото'}
                </Button>
                {!editItem && <span className='text-xs text-muted-foreground'>Сначала сохраните запись</span>}
              </div>
            </div>

            <div className='grid grid-cols-3 gap-3'>
              <div><Label>Инициалы</Label><Input value={form.initials} onChange={e => setForm(f => ({ ...f, initials: e.target.value }))} placeholder='ЖБ' /></div>
              <div><Label>Индекс</Label><Input type='number' value={form.index} onChange={e => setForm(f => ({ ...f, index: +e.target.value }))} /></div>
              <div><Label>Порядок</Label><Input type='number' value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: +e.target.value }))} /></div>
            </div>

            <div className='flex items-center gap-2'>
              <Switch checked={form.published} onCheckedChange={v => setForm(f => ({ ...f, published: v }))} />
              <Label>Опубликовано</Label>
            </div>

            <Tabs defaultValue='ru'>
              <TabsList><TabsTrigger value='ru'>RU</TabsTrigger><TabsTrigger value='en'>EN</TabsTrigger><TabsTrigger value='kk'>KK</TabsTrigger></TabsList>
              {LANGS.map(lang => (
                <TabsContent key={lang} value={lang} className='space-y-3'>
                  <div><Label>Имя</Label><Input value={form.name[lang]} onChange={e => setLangField('name', lang, e.target.value)} /></div>
                  <div><Label>Должности (каждая с новой строки)</Label><Textarea rows={3} value={form.positions[lang]} onChange={e => setLangField('positions', lang, e.target.value)} /></div>
                  <div><Label>Биография (каждый абзац с новой строки)</Label><Textarea rows={5} value={form.bio[lang]} onChange={e => setLangField('bio', lang, e.target.value)} /></div>
                  <div><Label>Указ / Степень</Label><Textarea rows={2} value={form.decree[lang]} onChange={e => setLangField('decree', lang, e.target.value)} /></div>
                </TabsContent>
              ))}
            </Tabs>
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
            <AlertDialogTitle>Удалить лидера?</AlertDialogTitle>
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
