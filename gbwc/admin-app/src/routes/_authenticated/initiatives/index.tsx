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
import { Edit, Trash, Plus, Upload, X } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/_authenticated/initiatives/')({
  component: InitiativesPage,
})

const LANGS = ['ru', 'en', 'kk'] as const
type Lang = typeof LANGS[number]

function emptyForm() {
  return {
    slug: '', num: '', sort_order: 0, published: true,
    title: { ru: '', en: '', kk: '' } as Record<Lang, string>,
    tag: { ru: '', en: '', kk: '' } as Record<Lang, string>,
    description: { ru: '', en: '', kk: '' } as Record<Lang, string>,
    details: { ru: '', en: '', kk: '' } as Record<Lang, string>,
    tasks: { ru: '', en: '', kk: '' } as Record<Lang, string>,
    cover: '',
  }
}

function InitiativesPage() {
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
      const res = await fetch('/api/initiatives?limit=200')
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
      num: item.num || '',
      sort_order: item.sort_order || 0,
      published: item.published !== false,
      title: { ru: item.title?.ru || '', en: item.title?.en || '', kk: item.title?.kk || '' },
      tag: { ru: item.tag?.ru || '', en: item.tag?.en || '', kk: item.tag?.kk || '' },
      description: { ru: item.description?.ru || '', en: item.description?.en || '', kk: item.description?.kk || '' },
      details: { ru: item.details?.ru || '', en: item.details?.en || '', kk: item.details?.kk || '' },
      tasks: {
        ru: Array.isArray(item.tasks?.ru) ? item.tasks.ru.join('\n') : (item.tasks?.ru || ''),
        en: Array.isArray(item.tasks?.en) ? item.tasks.en.join('\n') : (item.tasks?.en || ''),
        kk: Array.isArray(item.tasks?.kk) ? item.tasks.kk.join('\n') : (item.tasks?.kk || ''),
      },
      cover: item.cover || '',
    })
    setDialogOpen(true)
  }

  const setLangField = (field: string, lang: Lang, val: string) => {
    setForm(f => ({ ...f, [field]: { ...(f as any)[field], [lang]: val } }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const body = {
        ...form,
        tasks: {
          ru: form.tasks.ru.split('\n').map(s => s.trim()).filter(Boolean),
          en: form.tasks.en.split('\n').map(s => s.trim()).filter(Boolean),
          kk: form.tasks.kk.split('\n').map(s => s.trim()).filter(Boolean),
        }
      }
      const url = editItem ? `/api/initiatives/${editItem.id || editItem._id}` : '/api/initiatives'
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
      await authFetch(`/api/initiatives/${deleteId}`, { method: 'DELETE' })
      toast.success('Удалено')
      fetchItems()
    } catch { toast.error('Ошибка удаления') } finally { setDeleteId(null) }
  }

  const uploadCover = async (file: File) => {
    if (!editItem) { toast.error('Сначала сохраните инициативу'); return }
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('cover', file)
      const res = await authFetch(`/api/initiatives/${editItem.id || editItem._id}/cover`, {
        method: 'POST',
        body: fd,
      })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      setForm(f => ({ ...f, cover: data.cover || '' }))
      toast.success('Обложка загружена')
    } catch (e: any) { toast.error(e.message) } finally { setUploading(false) }
  }

  return (
    <>
      <header className='flex items-center justify-between border-b px-6 py-4'>
        <h1 className='text-2xl font-bold tracking-tight'>Инициативы</h1>
        <div className='flex items-center gap-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </header>

      <Main>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold'>Управление инициативами</h2>
          <Button onClick={openCreate}><Plus className='mr-2 h-4 w-4' />Добавить</Button>
        </div>

        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-16'>№</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Название (RU)</TableHead>
                <TableHead>Тег (RU)</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className='w-24'>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item: any) => (
                <TableRow key={item.id || item._id}>
                  <TableCell>{item.num}</TableCell>
                  <TableCell className='font-mono text-sm'>{item.slug}</TableCell>
                  <TableCell>{item.title?.ru}</TableCell>
                  <TableCell>{item.tag?.ru}</TableCell>
                  <TableCell>
                    <Badge variant={item.published !== false ? 'default' : 'secondary'}>
                      {item.published !== false ? 'Опубликовано' : 'Скрыто'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className='flex gap-1'>
                      <Button variant='ghost' size='icon' onClick={() => openEdit(item)}>
                        <Edit className='h-4 w-4' />
                      </Button>
                      <Button variant='ghost' size='icon' className='text-destructive' onClick={() => setDeleteId(item.id || item._id)}>
                        <Trash className='h-4 w-4' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && !loading && (
                <TableRow><TableCell colSpan={6} className='text-center py-8 text-muted-foreground'>Нет данных</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Main>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>{editItem ? 'Редактировать инициативу' : 'Новая инициатива'}</DialogTitle>
            <DialogDescription>{editItem ? 'Измените поля и сохраните.' : 'Заполните поля для новой инициативы.'}</DialogDescription>
          </DialogHeader>

          <div className='space-y-4'>
            <div className='grid grid-cols-3 gap-3'>
              <div>
                <Label>Slug</Label>
                <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder='initiative-slug' />
              </div>
              <div>
                <Label>Номер (num)</Label>
                <Input value={form.num} onChange={e => setForm(f => ({ ...f, num: e.target.value }))} placeholder='01' />
              </div>
              <div>
                <Label>Порядок</Label>
                <Input type='number' value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: +e.target.value }))} />
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Switch checked={form.published} onCheckedChange={v => setForm(f => ({ ...f, published: v }))} />
              <Label>Опубликовано</Label>
            </div>

            <Tabs defaultValue='ru'>
              <TabsList><TabsTrigger value='ru'>RU</TabsTrigger><TabsTrigger value='en'>EN</TabsTrigger><TabsTrigger value='kk'>KK</TabsTrigger></TabsList>
              {LANGS.map(lang => (
                <TabsContent key={lang} value={lang} className='space-y-3'>
                  <div>
                    <Label>Тег</Label>
                    <Input value={form.tag[lang]} onChange={e => setLangField('tag', lang, e.target.value)} />
                  </div>
                  <div>
                    <Label>Название</Label>
                    <Input value={form.title[lang]} onChange={e => setLangField('title', lang, e.target.value)} />
                  </div>
                  <div>
                    <Label>Описание</Label>
                    <Textarea rows={3} value={form.description[lang]} onChange={e => setLangField('description', lang, e.target.value)} />
                  </div>
                  <div>
                    <Label>Детали</Label>
                    <Textarea rows={3} value={form.details[lang]} onChange={e => setLangField('details', lang, e.target.value)} />
                  </div>
                  <div>
                    <Label>Задачи (каждая с новой строки)</Label>
                    <Textarea rows={4} value={form.tasks[lang]} onChange={e => setLangField('tasks', lang, e.target.value)} />
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {/* Cover Image */}
            <div>
              <Label>Обложка</Label>
              <div className='mt-1 flex items-center gap-3'>
                {form.cover && <img src={form.cover} alt='cover' className='h-16 w-24 object-cover rounded border' />}
                <input ref={coverRef} type='file' accept='image/*' className='hidden' onChange={e => e.target.files?.[0] && uploadCover(e.target.files[0])} />
                <Button type='button' variant='outline' size='sm' disabled={uploading || !editItem} onClick={() => coverRef.current?.click()}>
                  <Upload className='mr-2 h-4 w-4' />{uploading ? 'Загрузка...' : 'Загрузить обложку'}
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

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={v => !v && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить инициативу?</AlertDialogTitle>
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
