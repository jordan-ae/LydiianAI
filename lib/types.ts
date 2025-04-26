export interface Concept {
    id: string
    name: string
    type: "pdf" | "article"
    importance: number
    summary: string
    keywords?: string[]
    x?: number
    y?: number
    z?: number
    references?: {
      title: string
      context: string
      url?: string
    }[]
    connections?: {
      targetId: string
      targetName: string
      relationshipType: string
      description: string
    }[]
  }
  
  export interface Relationship {
    source: string
    target: string
    strength: number
    type: string
  }
  
  export interface GraphData {
    nodes: Concept[]
    links: Relationship[]
  }
  