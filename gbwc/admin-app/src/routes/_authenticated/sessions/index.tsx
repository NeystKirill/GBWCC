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
import { Edit, Trash, Plus, Upload, X, ImagePlus } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/_authenticated/sessions/')({
  component: SessionsPage,
})

const LANGS = ['ru', 'en', 'kk'] as const
type Lang = typeof LANGS[number]

function emptyForm() {
  return {
    numeral: '', year: '', sort_order: 0, published: true,
    video: '', gallery: '',
    theme: { ru: '', en: '', kk: '' } as Record<Lang, string>,
    date: { ru: '', en: '', kk: '' } as Record<Lang, string>,
    location: { ru: '', en: '', kk: '' } as Record<Lang, string>,
    context: { ru: '', en: '', kk: '' } as Record<Lang, string>,
    desc: { ru: '', en: '', kk: '' } as Record<Lang, string>,
    topics: { ru: '', en: '', kk: '' } as Record<Lang, string>,
    results: { ru: '', en: '', kk: '' } as Record<Lang, string>,
    members: [] as any[],
    guests: [] as any[],
  }
}

function SessionsPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editItem, setEditItem] = useState<any>(null)
  const [form, setForm] = useState(emptyForm())
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [localPhotos, setLocalPhotos] = useState<string[]>([])
  const galleryRef = useRef<HTMLInputElement>(null)
  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/sessions?limit=200')
      if (res.ok) {
        const data = await res.json()
        setItems(data.items || data || [])
      }
    } catch { toast.error('Ошибка загрузки') } finally { setLoading(false) }
  }

  const toArr = (val: any, lang: Lang) => {
    if (!val) return ''
    const v = val[lang]
    if (Array.isArray(v)) return v.join('\n')
    return v || ''
  }

  const openEdit = (item: any) => {
    setEditItem(item)
    setLocalPhotos(Array.isArray(item.localPhotos) ? item.localPhotos : [])
    setForm({
      numeral: item.numeral || '',
      year: item.year || '',
      sort_order: item.sort_order || 0,
      published: item.published !== false,
      video: item.video || '',
      gallery: item.gallery || '',
      theme: { ru: item.theme?.ru || '', en: item.theme?.en || '', kk: item.theme?.kk || '' },
      date: { ru: toArr(item.date, 'ru'), en: toArr(item.date, 'en'), kk: toArr(item.date, 'kk') },
      location: { ru: item.location?.ru || '', en: item.location?.en || '', kk: item.location?.kk || '' },
      context: { ru: item.context?.ru || '', en: item.context?.en || '', kk: item.context?.kk || '' },
      desc: { ru: item.desc?.ru || '', en: item.desc?.en || '', kk: item.desc?.kk || '' },
      topics: { ru: toArr(item.topics, 'ru'), en: toArr(item.topics, 'en'), kk: toArr(item.topics, 'kk') },
      results: { ru: toArr(item.results, 'ru'), en: toArr(item.results, 'en'), kk: toArr(item.results, 'kk') },
      members: item.members || [],
      guests: item.guests || [],
    })
    setDialogOpen(true)
  }

  const openCreate = () => {
    setEditItem(null)
    setLocalPhotos([])
    setForm(emptyForm())
    setDialogOpen(true)
  }

  const setLangField = (field: string, lang: Lang, val: string) => {
    setForm(f => ({ ...f, [field]: { ...(f as any)[field], [lang]: val } }))
  }

  const splitLines = (s: string) => s.split('\n').map(x => x.trim()).filter(Boolean)

  const handleSave = async () => {
    setSaving(true)
    try {
      const body = {
        ...form,
        topics: { ru: splitLines(form.topics.ru), en: splitLines(form.topics.en), kk: splitLines(form.topics.kk) },
        results: { ru: splitLines(form.results.ru), en: splitLines(form.results.en), kk: splitLines(form.results.kk) },
      }
      const url = editItem ? `/api/sessions/${editItem.id || editItem._id}` : '/api/sessions'
      const method = editItem ? 'PATCH' : 'POST'
      const res = await authFetch(url, {
        method,
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
      await authFetch(`/api/sessions/${deleteId}`, { method: 'DELETE' })
      toast.success('Удалено')
      fetchItems()
    } catch { toast.error('Ошибка') } finally { setDeleteId(null) }
  }

  const uploadGallery = async (files: FileList) => {
    if (!editItem) { toast.error('Сначала сохраните сессию'); return }
    setUploading(true)
    try {
      const fd = new FormData()
      Array.from(files).forEach(f => fd.append('files', f))
      const res = await authFetch(`/api/sessions/${editItem.id || editItem._id}/gallery`, {
        method: 'POST', body: fd,
      })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      setLocalPhotos(Array.isArray(data.localPhotos) ? data.localPhotos : [])
      toast.success('Фото загружено')
      fetchItems()
    } catch (e: any) { toast.error(e.message) } finally { setUploading(false) }
  }

  return (
    <>
      <header className='flex items-center justify-between border-b px-6 py-4'>
        <h1 className='text-2xl font-bold tracking-tight'>Сессии</h1>
        <div className='flex items-center gap-4'><ThemeSwitch /><ProfileDropdown /></div>
      </header>

      <Main>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold'>Управление сессиями</h2>
          <Button onClick={openCreate}><Plus className='mr-2 h-4 w-4' />Добавить</Button>
        </div>

        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Номер</TableHead>
                <TableHead>Год</TableHead>
                <TableHead>Тема (RU)</TableHead>
                <TableHead>Дата (RU)</TableHead>
                <TableHead>Участники</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className='w-28'>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item: any) => (
                <TableRow key={item.id || item._id}>
                  <TableCell>{item.numeral}</TableCell>
                  <TableCell>{item.year}</TableCell>
                  <TableCell className='max-w-xs truncate'>{item.theme?.ru || (typeof item.theme === 'string' ? item.theme : '')}</TableCell>
                  <TableCell>{item.date?.ru || (typeof item.date === 'string' ? item.date : '')}</TableCell>
                  <TableCell>{(item.members?.length || 0) + (item.guests?.length || 0)}</TableCell>
                  <TableCell>
                    <Badge variant={item.published !== false ? 'default' : 'secondary'}>
                      {item.published !== false ? 'Опубликовано' : 'Скрыто'}
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

      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className='max-w-3xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>{editItem ? 'Редактировать сессию' : 'Новая сессия'}</DialogTitle>
            <DialogDescription>{editItem ? 'Измените поля и сохраните.' : 'Заполните поля для новой сессии.'}</DialogDescription>
          </DialogHeader>

          <div className='space-y-4'>
            <div className='grid grid-cols-3 gap-3'>
              <div><Label>Нумерал (I, II…)</Label><Input value={form.numeral} onChange={e => setForm(f => ({ ...f, numeral: e.target.value }))} /></div>
              <div><Label>Год</Label><Input value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} /></div>
              <div><Label>Порядок</Label><Input type='number' value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: +e.target.value }))} /></div>
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <div><Label>Видео (URL)</Label><Input value={form.video} onChange={e => setForm(f => ({ ...f, video: e.target.value }))} placeholder='https://youtube.com/...' /></div>
              <div><Label>Галерея Google Drive (URL)</Label><Input value={form.gallery} onChange={e => setForm(f => ({ ...f, gallery: e.target.value }))} placeholder='https://drive.google.com/...' /></div>
            </div>

            <div className='flex items-center gap-2'>
              <Switch checked={form.published} onCheckedChange={v => setForm(f => ({ ...f, published: v }))} />
              <Label>Опубликовано</Label>
            </div>

            <Tabs defaultValue='ru'>
              <TabsList><TabsTrigger value='ru'>RU</TabsTrigger><TabsTrigger value='en'>EN</TabsTrigger><TabsTrigger value='kk'>KK</TabsTrigger></TabsList>
              {LANGS.map(lang => (
                <TabsContent key={lang} value={lang} className='space-y-3'>
                  <div><Label>Тема</Label><Textarea rows={2} value={form.theme[lang]} onChange={e => setLangField('theme', lang, e.target.value)} /></div>
                  <div><Label>Дата</Label><Input value={form.date[lang]} onChange={e => setLangField('date', lang, e.target.value)} /></div>
                  <div><Label>Место</Label><Input value={form.location[lang]} onChange={e => setLangField('location', lang, e.target.value)} /></div>
                  <div><Label>Контекст</Label><Textarea rows={2} value={form.context[lang]} onChange={e => setLangField('context', lang, e.target.value)} /></div>
                  <div><Label>Описание</Label><Textarea rows={3} value={form.desc[lang]} onChange={e => setLangField('desc', lang, e.target.value)} /></div>
                  <div><Label>Темы (каждая с новой строки)</Label><Textarea rows={4} value={form.topics[lang]} onChange={e => setLangField('topics', lang, e.target.value)} /></div>
                  <div><Label>Итоги (каждый с новой строки)</Label><Textarea rows={4} value={form.results[lang]} onChange={e => setLangField('results', lang, e.target.value)} /></div>
                </TabsContent>
              ))}
            </Tabs>

            {/* Local Photos */}
            <div>
              <Label>Локальные фото ({localPhotos.length})</Label>
              <div className='mt-2 flex flex-wrap gap-2'>
                {localPhotos.map((url: string, i: number) => (
                  <img key={i} src={url} alt='' className='h-16 w-20 object-cover rounded border' />
                ))}
                <input ref={galleryRef} type='file' accept='image/*' multiple className='hidden'
                  onChange={e => e.target.files?.length && uploadGallery(e.target.files)} />
                <button
                  onClick={() => editItem ? galleryRef.current?.click() : toast.error('Сначала сохраните')}
                  className='h-16 w-20 rounded border-2 border-dashed flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors'
                >
                  <ImagePlus className='h-5 w-5' />
                  <span className='text-xs mt-1'>{uploading ? '...' : 'Добавить'}</span>
                </button>
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
            <AlertDialogTitle>Удалить сессию?</AlertDialogTitle>
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
