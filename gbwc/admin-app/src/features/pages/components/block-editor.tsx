import { useState, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GripVertical, Trash2, Plus } from 'lucide-react'

export type Block = {
  id: string
  type: string
  data: any
}

/* ─── SortableBlock (inline) ─── */

function SortableBlock({ block, onUpdate, onDelete }: { block: Block; onUpdate: (data: any) => void; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const renderEditor = () => {
    switch (block.type) {
      case 'Hero':
        return (
          <div className='space-y-3'>
            <div>
              <label className='text-xs font-semibold'>Label</label>
              <input className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm' placeholder='e.g. GBWC' value={block.data.label || ''} onChange={(e) => onUpdate({ ...block.data, label: e.target.value })} />
            </div>
            <div>
              <label className='text-xs font-semibold'>Title</label>
              <input className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm' placeholder='Page Title' value={block.data.title || ''} onChange={(e) => onUpdate({ ...block.data, title: e.target.value })} />
            </div>
            <div>
              <label className='text-xs font-semibold'>Description</label>
              <textarea className='flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm' placeholder='Description...' value={block.data.desc || ''} onChange={(e) => onUpdate({ ...block.data, desc: e.target.value })} />
            </div>
          </div>
        )
      case 'TextWithImage':
        return (
          <div className='space-y-3'>
            <div>
              <label className='text-xs font-semibold'>Text Content</label>
              <textarea className='flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm' placeholder='Main text content...' value={block.data.text || ''} onChange={(e) => onUpdate({ ...block.data, text: e.target.value })} />
            </div>
            <div>
              <label className='text-xs font-semibold'>Image URL / Upload</label>
              <input className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm' placeholder='/img/example.jpg' value={block.data.image || ''} onChange={(e) => onUpdate({ ...block.data, image: e.target.value })} />
            </div>
          </div>
        )
      case 'Quote':
        return (
          <div className='space-y-3'>
            <div>
              <label className='text-xs font-semibold'>Quote Text</label>
              <textarea className='flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm' value={block.data.quote || ''} onChange={(e) => onUpdate({ ...block.data, quote: e.target.value })} />
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <div>
                <label className='text-xs font-semibold'>Author</label>
                <input className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm' value={block.data.author || ''} onChange={(e) => onUpdate({ ...block.data, author: e.target.value })} />
              </div>
              <div>
                <label className='text-xs font-semibold'>Role</label>
                <input className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm' value={block.data.role || ''} onChange={(e) => onUpdate({ ...block.data, role: e.target.value })} />
              </div>
            </div>
          </div>
        )
      case 'Stats':
        return (
          <div className='space-y-3'>
            <p className='text-sm text-muted-foreground'>A section displaying numerical stats.</p>
            <div>
              <label className='text-xs font-semibold'>Stats JSON (temporary)</label>
              <textarea className='flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm font-mono' placeholder='[{"value": "13+", "label": "Countries"}]' value={block.data.statsJson || ''} onChange={(e) => onUpdate({ ...block.data, statsJson: e.target.value })} />
            </div>
          </div>
        )
      case 'HomeAbout':
        return (
          <div className='space-y-3'>
            <div>
              <label className='text-xs font-semibold'>Label (RU)</label>
              <input className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm' value={block.data.label?.ru || ''} onChange={(e) => onUpdate({ ...block.data, label: { ...block.data.label, ru: e.target.value } })} />
            </div>
            <div>
              <label className='text-xs font-semibold'>Title (RU)</label>
              <input className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm' value={block.data.title?.ru || ''} onChange={(e) => onUpdate({ ...block.data, title: { ...block.data.title, ru: e.target.value } })} />
            </div>
            <div className='flex items-center gap-2 mt-2'>
              <input type='checkbox' id={`reverse-${block.id}`} checked={block.data.reverseLayout || false} onChange={(e) => onUpdate({ ...block.data, reverseLayout: e.target.checked })} />
              <label htmlFor={`reverse-${block.id}`} className='text-sm font-medium leading-none'>Reverse Layout (Image on Left, Text on Right)</label>
            </div>
          </div>
        )
      case 'GenericText':
        return (
          <div className='space-y-3'>
            <div>
              <label className='text-xs font-semibold'>Text Content</label>
              <textarea className='flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm' placeholder='Your text here...' value={block.data.text || ''} onChange={(e) => onUpdate({ ...block.data, text: e.target.value })} />
            </div>
          </div>
        )
      case 'GenericImage':
        return (
          <div className='space-y-3'>
            <div>
              <label className='text-xs font-semibold'>Image URL</label>
              <input className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm' placeholder='/img/photo.jpg' value={block.data.image || ''} onChange={(e) => onUpdate({ ...block.data, image: e.target.value })} />
            </div>
          </div>
        )
      case 'VideoHero':
      case 'HomeDirections':
      case 'HomePlenary':
      case 'HomeKeyPeople':
      case 'HomeInitiatives':
      case 'HomePartners':
      case 'HomeCoop':
      case 'Sep':
        return (
          <div className='text-muted-foreground text-sm p-2 bg-muted/20 rounded border border-dashed'>
            This block is connected to dynamic data and will render automatically. No additional configuration needed.
          </div>
        )
      default:
        return (
          <div className='space-y-3'>
            <div className='text-muted-foreground text-sm p-2 bg-muted/20 rounded border border-dashed'>
              This is a dynamic block. If it supports custom data, you can edit it as raw JSON below.
            </div>
            <div>
              <label className='text-xs font-semibold'>Raw Data (JSON)</label>
              <textarea
                className='flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm font-mono'
                placeholder='{}'
                value={typeof block.data === 'object' ? JSON.stringify(block.data, null, 2) : block.data || ''}
                onChange={(e) => { try { onUpdate(JSON.parse(e.target.value)) } catch { /* ignore invalid JSON */ } }}
              />
            </div>
          </div>
        )
    }
  }

  return (
    <Card ref={setNodeRef} style={style} className='bg-background shadow-sm'>
      <CardHeader className='flex flex-row items-center justify-between py-3 px-4 border-b space-y-0'>
        <div className='flex items-center gap-2'>
          <div {...attributes} {...listeners} className='cursor-grab active:cursor-grabbing p-1 -ml-2 hover:bg-muted rounded text-muted-foreground'>
            <GripVertical className='h-5 w-5' />
          </div>
          <CardTitle className='text-sm font-medium'>
            {block.type} Block
          </CardTitle>
        </div>
        <Button variant='ghost' size='icon' onClick={onDelete} className='h-8 w-8 text-destructive'>
          <Trash2 className='h-4 w-4' />
        </Button>
      </CardHeader>
      <CardContent className='p-4'>
        {renderEditor()}
      </CardContent>
    </Card>
  )
}

/* ─── BlockEditor ─── */

interface BlockEditorProps {
  initialBlocks: Block[]
  onChange: (blocks: Block[]) => void
}

export function BlockEditor({ initialBlocks, onChange }: BlockEditorProps) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks)

  useEffect(() => {
    setBlocks(initialBlocks)
  }, [initialBlocks])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id)
      const newIndex = blocks.findIndex((b) => b.id === over.id)
      const newBlocks = arrayMove(blocks, oldIndex, newIndex)
      setBlocks(newBlocks)
      onChange(newBlocks)
    }
  }

  const addBlock = (type: string) => {
    const newBlock: Block = {
      id: `block_${Date.now()}`,
      type,
      data: {},
    }
    const newBlocks = [...blocks, newBlock]
    setBlocks(newBlocks)
    onChange(newBlocks)
  }

  const updateBlock = (id: string, data: any) => {
    const newBlocks = blocks.map((b) => (b.id === id ? { ...b, data } : b))
    setBlocks(newBlocks)
    onChange(newBlocks)
  }

  const deleteBlock = (id: string) => {
    const newBlocks = blocks.filter((b) => b.id !== id)
    setBlocks(newBlocks)
    onChange(newBlocks)
  }

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap gap-2 mb-4 p-4 border rounded-md bg-muted/30'>
        <span className='w-full text-xs font-semibold mb-1 text-muted-foreground'>Basic Blocks</span>
        <Button variant='outline' size='sm' onClick={() => addBlock('GenericText')}><Plus className='mr-2 h-4 w-4' /> Text</Button>
        <Button variant='outline' size='sm' onClick={() => addBlock('GenericImage')}><Plus className='mr-2 h-4 w-4' /> Image</Button>
        <Button variant='outline' size='sm' onClick={() => addBlock('TextWithImage')}><Plus className='mr-2 h-4 w-4' /> Text + Image</Button>
        <Button variant='outline' size='sm' onClick={() => addBlock('Hero')}><Plus className='mr-2 h-4 w-4' /> Hero (Generic)</Button>
        <Button variant='outline' size='sm' onClick={() => addBlock('Quote')}><Plus className='mr-2 h-4 w-4' /> Quote</Button>
        <Button variant='outline' size='sm' onClick={() => addBlock('Stats')}><Plus className='mr-2 h-4 w-4' /> Stats</Button>
        <Button variant='outline' size='sm' onClick={() => addBlock('Sep')}><Plus className='mr-2 h-4 w-4' /> Separator</Button>

        <span className='w-full text-xs font-semibold mt-2 mb-1 text-muted-foreground'>Home Specific</span>
        <Button variant='outline' size='sm' onClick={() => addBlock('VideoHero')}><Plus className='mr-2 h-4 w-4' /> Video Hero</Button>
        <Button variant='outline' size='sm' onClick={() => addBlock('HomeAbout')}><Plus className='mr-2 h-4 w-4' /> Home About</Button>
        <Button variant='outline' size='sm' onClick={() => addBlock('HomeDirections')}><Plus className='mr-2 h-4 w-4' /> Directions</Button>
        <Button variant='outline' size='sm' onClick={() => addBlock('HomePlenary')}><Plus className='mr-2 h-4 w-4' /> Plenary</Button>
        <Button variant='outline' size='sm' onClick={() => addBlock('HomeKeyPeople')}><Plus className='mr-2 h-4 w-4' /> Key People</Button>
        <Button variant='outline' size='sm' onClick={() => addBlock('HomeInitiatives')}><Plus className='mr-2 h-4 w-4' /> Initiatives</Button>
        <Button variant='outline' size='sm' onClick={() => addBlock('HomePartners')}><Plus className='mr-2 h-4 w-4' /> Partners</Button>
        <Button variant='outline' size='sm' onClick={() => addBlock('HomeCoop')}><Plus className='mr-2 h-4 w-4' /> Cooperation</Button>

        <span className='w-full text-xs font-semibold mt-2 mb-1 text-muted-foreground'>Page Content Blocks</span>
        <Button variant='outline' size='sm' onClick={() => addBlock('InitiativesContent')}><Plus className='mr-2 h-4 w-4' /> Initiatives Content</Button>
        <Button variant='outline' size='sm' onClick={() => addBlock('MediaContent')}><Plus className='mr-2 h-4 w-4' /> Media Content</Button>
        <Button variant='outline' size='sm' onClick={() => addBlock('ContactsContent')}><Plus className='mr-2 h-4 w-4' /> Contacts Content</Button>
        <Button variant='outline' size='sm' onClick={() => addBlock('PartnersContent')}><Plus className='mr-2 h-4 w-4' /> Partners Content</Button>
        <Button variant='outline' size='sm' onClick={() => addBlock('EventsContent')}><Plus className='mr-2 h-4 w-4' /> Events Content</Button>
        <Button variant='outline' size='sm' onClick={() => addBlock('FoundersContent')}><Plus className='mr-2 h-4 w-4' /> Founders Content</Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
      >
        <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
          <div className='space-y-4'>
            {blocks.map((block) => (
              <SortableBlock
                key={block.id}
                block={block}
                onUpdate={(data: any) => updateBlock(block.id, data)}
                onDelete={() => deleteBlock(block.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
