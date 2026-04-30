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

export const Route = createFileRoute('/_authenticated/news/')({
  component: NewsPage,
})

const LANGS = ['ru', 'en', 'kk'] as const
type Lang = typeof LANGS[number]

function emptyForm() {
  return {
    slug: '',
    published: true,
    source: '',
    source_url: '',
    published_at: '',
    cover: '',
    title: { ru: '', en: '', kk: '' } as Record<Lang, string>,
    excerpt: { ru: '', en: '', kk: '' } as Record<Lang, string>,
    body: { ru: '', en: '', kk: '' } as Record<Lang, string>,
  }
}

function toSlug(text: string) {
  return text.toLowerCase()
    .replace(/[^a-zа-яё0-9\s-]/gi, '')
    .replace(/\s+/g, '-')
    .slice(0, 80)
}

function NewsPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editItem, setEditItem] = useState<any>(null)
  const [form, setForm] = useState(emptyForm())
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const coverRef = useRef<HTMLInputElement>(null)

  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/news?limit=200')
      if (res.ok) {
        const data = await res.json()
        setItems(data.items || data || [])
      }
    } catch { toast.error('Ошибка загрузки') } finally { setLoading(false) }
  }

  const openCreate = () => {
    setEditItem(null)
    setForm(emptyForm())
    setDialogOpen(true)
  }

  const openEdit = (item: any) => {
    setEditItem(item)
    setForm({
      slug: item.slug || '',
      published: item.published !== false,
      source: item.source || '',
      source_url: item.source_url || '',
      published_at: item.published_at ? item.published_at.slice(0, 16) : '',
      cover: item.cover || '',
      title: { ru: item.title?.ru || '', en: item.title?.en || '', kk: item.title?.kk || '' },
      excerpt: { ru: item.excerpt?.ru || '', en: item.excerpt?.en || '', kk: item.excerpt?.kk || '' },
      body: { ru: item.body?.ru || '', en: item.body?.en || '', kk: item.body?.kk || '' },
    })
    setDialogOpen(true)
  }

  const setLangField = (field: string, lang: Lang, val: string) =>
    setForm(f => ({ ...f, [field]: { ...(f as any)[field], [lang]: val } }))

  const handleSave = async () => {
    if (!form.slug && form.title.ru) {
      setForm(f => ({ ...f, slug: toSlug(f.title.ru) }))
    }
    setSaving(true)
    try {
      const body = {
        ...form,
        slug: form.slug || toSlug(form.title.ru),
        published_at: form.published_at || new Date().toISOString(),
      }
      const url = editItem ? `/api/news/${editItem.id || editItem._id}` : '/api/news'
      const res = await authFetch(url, {
        method: editItem ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error(await res.text())
      toast.success(editItem ? 'Сохранено' : 'Создано')
      setDialogOpen(false)
      fetchItems()
    } catch (e: any) { toast.error(e.message) } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await authFetch(`/api/news/${deleteId}`, { method: 'DELETE' })
      toast.success('Удалено')
      fetchItems()
    } catch { toast.error('Ошибка') } finally { setDeleteId(null) }
  }

  const uploadCover = async (file: File) => {
    if (!editItem) { toast.error('Сначала сохраните новость'); return }
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('cover', file)
      const res = await authFetch(`/api/news/${editItem.id || editItem._id}/cover`, {
        method: 'POST',
        body: fd,
      })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      setForm(f => ({ ...f, cover: data.cover || '' }))
      setEditItem((prev: any) => ({ ...prev, cover: data.cover || '' }))
      toast.success('Обложка загружена')
    } catch (e: any) { toast.error(e.message) } finally { setUploading(false) }
  }

  const fmt = (s: string) => s ? new Date(s).toLocaleDateString('ru-RU') : '—'

  return (
    <>
      <header className='flex items-center justify-between border-b px-6 py-4'>
        <h1 className='text-2xl font-bold tracking-tight'>Новости</h1>
        <div className='flex items-center gap-4'><ThemeSwitch /><ProfileDropdown /></div>
      </header>

      <Main>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold'>Управление новостями</h2>
          <Button onClick={openCreate}><Plus className='mr-2 h-4 w-4' />Добавить</Button>
        </div>

        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-16'>Обложка</TableHead>
                <TableHead>Заголовок (RU)</TableHead>
                <TableHead>Источник</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className='w-24'>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item: any) => (
                <TableRow key={item.id || item._id}>
                  <TableCell>
                    {item.cover && <img src={item.cover} alt='' className='h-10 w-14 object-cover rounded' />}
                  </TableCell>
                  <TableCell className='max-w-xs'>
                    <div className='line-clamp-2 font-medium text-sm'>{item.title?.ru || item.slug}</div>
                  </TableCell>
                  <TableCell className='text-sm text-muted-foreground'>{item.source || '—'}</TableCell>
                  <TableCell className='text-sm whitespace-nowrap'>{fmt(item.published_at)}</TableCell>
                  <TableCell>
                    <Badge variant={item.published !== false ? 'default' : 'secondary'}>
                      {item.published !== false ? 'Опубликовано' : 'Черновик'}
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
                <TableRow><TableCell colSpan={6} className='text-center py-8 text-muted-foreground'>Нет новостей</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className='max-w-3xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>{editItem ? 'Редактировать новость' : 'Новая новость'}</DialogTitle>
            <DialogDescription>{editItem ? 'Измените поля и сохраните.' : 'Заполните поля для новой новости.'}</DialogDescription>
          </DialogHeader>

          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <Label>Slug (URL)</Label>
                <Input value={form.slug}
                  onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                  onBlur={() => !form.slug && form.title.ru && setForm(f => ({ ...f, slug: toSlug(f.title.ru) }))}
                  placeholder='auto-from-title' />
              </div>
              <div>
                <Label>Дата публикации</Label>
                <Input type='datetime-local' value={form.published_at}
                  onChange={e => setForm(f => ({ ...f, published_at: e.target.value }))} />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <div><Label>Источник (СМИ)</Label><Input value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))} placeholder='Forbes, 24.kz...' /></div>
              <div><Label>Ссылка на источник</Label><Input value={form.source_url} onChange={e => setForm(f => ({ ...f, source_url: e.target.value }))} placeholder='https://' /></div>
            </div>

            <div className='flex items-center gap-2'>
              <Switch checked={form.published} onCheckedChange={v => setForm(f => ({ ...f, published: v }))} />
              <Label>Опубликовано</Label>
            </div>

            <Tabs defaultValue='ru'>
              <TabsList><TabsTrigger value='ru'>RU</TabsTrigger><TabsTrigger value='en'>EN</TabsTrigger><TabsTrigger value='kk'>KK</TabsTrigger></TabsList>
              {LANGS.map(lang => (
                <TabsContent key={lang} value={lang} className='space-y-3'>
                  <div><Label>Заголовок</Label><Input value={form.title[lang]} onChange={e => setLangField('title', lang, e.target.value)} /></div>
                  <div><Label>Краткое описание</Label><Textarea rows={3} value={form.excerpt[lang]} onChange={e => setLangField('excerpt', lang, e.target.value)} /></div>
                  <div><Label>Полный текст</Label><Textarea rows={8} value={form.body[lang]} onChange={e => setLangField('body', lang, e.target.value)} /></div>
                </TabsContent>
              ))}
            </Tabs>

            <div>
              <Label>Обложка</Label>
              <div className='mt-1 flex items-center gap-3'>
                {form.cover && <img src={form.cover} alt='' className='h-16 w-24 object-cover rounded border' />}
                <input ref={coverRef} type='file' accept='image/*' className='hidden'
                  onChange={e => e.target.files?.[0] && uploadCover(e.target.files[0])} />
                <Button type='button' variant='outline' size='sm' disabled={uploading || !editItem} onClick={() => coverRef.current?.click()}>
                  <Upload className='mr-2 h-4 w-4' />{uploading ? 'Загрузка...' : 'Загрузить обложку'}
                </Button>
                {!editItem && <span className='text-xs text-muted-foreground'>Сначала сохраните запись</span>}
              </div>
              <Input className='mt-2' value={form.cover} onChange={e => setForm(f => ({ ...f, cover: e.target.value }))} placeholder='или вставьте URL обложки' />
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
            <AlertDialogTitle>Удалить новость?</AlertDialogTitle>
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
