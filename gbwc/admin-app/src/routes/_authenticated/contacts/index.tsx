import { createFileRoute } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { authFetch } from '@/lib/auth-fetch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Trash, Eye } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/_authenticated/contacts/')({
  component: ContactsPage,
})

const STATUS_OPTIONS = [
  { value: 'new', label: 'Новое' },
  { value: 'in_progress', label: 'В работе' },
  { value: 'responded', label: 'Отвечено' },
  { value: 'archived', label: 'Архив' },
]

const statusVariant = (s: string): 'default' | 'secondary' | 'outline' => {
  if (s === 'new') return 'default'
  if (s === 'responded') return 'outline'
  return 'secondary'
}

function ContactsPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [viewItem, setViewItem] = useState<any>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await authFetch('/api/contact?limit=200')
      if (res.ok) { const data = await res.json(); setItems(data.items || data || []) }
    } catch { toast.error('Ошибка загрузки') } finally { setLoading(false) }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await authFetch(`/api/contact/${deleteId}`, { method: 'DELETE' })
      toast.success('Удалено'); setItems(items.filter(i => (i.id || i._id) !== deleteId))
    } catch { toast.error('Ошибка') } finally { setDeleteId(null) }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await authFetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      setItems(items.map(i => (i.id || i._id) === id ? { ...i, status } : i))
      if (viewItem && (viewItem.id || viewItem._id) === id) setViewItem((v: any) => ({ ...v, status }))
      toast.success('Статус обновлён')
    } catch { toast.error('Ошибка') }
  }

  return (
    <>
      <header className='flex items-center justify-between border-b px-6 py-4'>
        <h1 className='text-2xl font-bold tracking-tight'>Обращения</h1>
        <div className='flex items-center gap-4'><ThemeSwitch /><ProfileDropdown /></div>
      </header>

      <Main>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold'>Входящие обращения ({items.length})</h2>
        </div>

        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Дата</TableHead>
                <TableHead>Имя</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Компания</TableHead>
                <TableHead>Тема</TableHead>
                <TableHead>Сообщение</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className='w-24'>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item: any) => (
                <TableRow key={item.id || item._id}>
                  <TableCell className='text-sm whitespace-nowrap'>
                    {item.created_at ? new Date(item.created_at).toLocaleDateString('ru-RU') : '—'}
                  </TableCell>
                  <TableCell className='font-medium'>{item.name}</TableCell>
                  <TableCell className='text-sm'>{item.email}</TableCell>
                  <TableCell className='text-sm'>{item.company || '—'}</TableCell>
                  <TableCell className='max-w-32 truncate text-sm'>{item.subject || '—'}</TableCell>
                  <TableCell className='max-w-xs'>
                    <span className='line-clamp-2 text-sm text-muted-foreground'>{item.message}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(item.status || 'new')}>
                      {STATUS_OPTIONS.find(s => s.value === (item.status || 'new'))?.label || item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className='flex gap-1'>
                      <Button variant='ghost' size='icon' onClick={() => setViewItem(item)}><Eye className='h-4 w-4' /></Button>
                      <Button variant='ghost' size='icon' className='text-destructive' onClick={() => setDeleteId(item.id || item._id)}><Trash className='h-4 w-4' /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && !loading && (
                <TableRow><TableCell colSpan={8} className='text-center py-8 text-muted-foreground'>Нет обращений</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Main>

      {/* View Dialog */}
      <Dialog open={!!viewItem} onOpenChange={v => !v && setViewItem(null)}>
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle>Обращение</DialogTitle>
            <DialogDescription>Просмотр входящего обращения и управление статусом.</DialogDescription>
          </DialogHeader>
          {viewItem && (
            <div className='space-y-3 text-sm'>
              <div className='grid grid-cols-2 gap-2'>
                <div><span className='text-muted-foreground'>Имя:</span> <strong>{viewItem.name}</strong></div>
                <div><span className='text-muted-foreground'>Email:</span> <a href={`mailto:${viewItem.email}`} className='text-primary underline'>{viewItem.email}</a></div>
              </div>
              {viewItem.company && <div><span className='text-muted-foreground'>Компания:</span> {viewItem.company}</div>}
              {viewItem.subject && <div><span className='text-muted-foreground'>Тема:</span> {viewItem.subject}</div>}
              <div><span className='text-muted-foreground'>Дата:</span> {viewItem.created_at ? new Date(viewItem.created_at).toLocaleString('ru-RU') : '—'}</div>
              <div className='rounded-md border p-3 bg-muted/30'>
                <p className='whitespace-pre-wrap'>{viewItem.message}</p>
              </div>
              <div>
                <Label>Изменить статус</Label>
                <Select value={viewItem.status || 'new'} onValueChange={v => updateStatus(viewItem.id || viewItem._id, v)}>
                  <SelectTrigger className='mt-1'><SelectValue /></SelectTrigger>
                  <SelectContent>{STATUS_OPTIONS.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant='outline' onClick={() => setViewItem(null)}>Закрыть</Button>
            {viewItem?.email && (
              <Button asChild>
                <a href={`mailto:${viewItem.email}?subject=Re: ${viewItem.subject || 'GBWC'}`}>Ответить по email</a>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={v => !v && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить обращение?</AlertDialogTitle>
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
