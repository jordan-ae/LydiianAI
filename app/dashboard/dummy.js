export const documentsY = [
    {
      id: 'doc1',
      title: 'Machine Learning Fundamentals',
      source_type: 'pdf',
      url: 'https://example.com/ml-fundamentals.pdf',
      uploaded_at: '2023-05-15T10:00:00Z',
      processed: true,
      importance: 8
    },
    {
      id: 'doc2',
      title: 'Neural Networks Research Paper',
      source_type: 'pdf',
      url: 'https://example.com/nn-research.pdf',
      uploaded_at: '2023-06-20T14:30:00Z',
      processed: true,
      importance: 9
    },
    {
      id: 'doc3',
      title: 'The Future of AI - Blog Post',
      source_type: 'article',
      url: 'https://example.com/future-of-ai',
      uploaded_at: '2023-07-10T08:15:00Z',
      processed: true,
      importance: 7
    },
    {
      id: 'doc4',
      title: 'Data Privacy Regulations',
      source_type: 'pdf',
      url: 'https://example.com/privacy-regs.pdf',
      uploaded_at: '2023-08-05T11:20:00Z',
      processed: true,
      importance: 6
    },
    {
      id: 'doc5',
      title: 'Blockchain Technology Explained',
      source_type: 'article',
      url: 'https://example.com/blockchain-explained',
      uploaded_at: '2023-09-12T16:45:00Z',
      processed: true,
      importance: 5
    }
  ];

  export const concepts = [
    {
      id: 'concept1',
      name: 'Machine Learning',
      normalized_name: 'machine learning',
      summary: 'Field of study that gives computers the ability to learn without being explicitly programmed.',
      importance_score: 9.5,
      created_at: '2023-05-16T09:00:00Z'
    },
    {
      id: 'concept2',
      name: 'Neural Networks',
      normalized_name: 'neural networks',
      summary: 'Computing systems inspired by biological neural networks that are used to recognize patterns.',
      importance_score: 8.7,
      created_at: '2023-06-21T10:30:00Z'
    },
    {
      id: 'concept3',
      name: 'Artificial Intelligence',
      normalized_name: 'artificial intelligence',
      summary: 'Simulation of human intelligence processes by machines, especially computer systems.',
      importance_score: 9.2,
      created_at: '2023-07-11T08:45:00Z'
    },
    {
      id: 'concept4',
      name: 'Data Privacy',
      normalized_name: 'data privacy',
      summary: 'Aspect of data protection that deals with the proper handling of sensitive data.',
      importance_score: 7.8,
      created_at: '2023-08-06T12:00:00Z'
    },
    {
      id: 'concept5',
      name: 'Blockchain',
      normalized_name: 'blockchain',
      summary: 'Decentralized, distributed ledger that records the provenance of a digital asset.',
      importance_score: 7.5,
      created_at: '2023-09-13T17:30:00Z'
    },
    {
      id: 'concept6',
      name: 'Deep Learning',
      normalized_name: 'deep learning',
      summary: 'Subset of machine learning that uses multi-layered neural networks.',
      importance_score: 8.3,
      created_at: '2023-06-22T11:15:00Z'
    }
  ];

  export const documentConcepts = [
    {
      document_id: 'doc1',
      concept_id: 'concept1',
      context: 'Machine learning algorithms build a model based on sample data to make predictions.',
      page_number: 5
    },
    {
      document_id: 'doc1',
      concept_id: 'concept6',
      context: 'Deep learning is a specialized form of machine learning.',
      page_number: 12
    },
    {
      document_id: 'doc2',
      concept_id: 'concept2',
      context: 'Neural networks consist of layers of interconnected nodes that process information.',
      page_number: 3
    },
    {
      document_id: 'doc2',
      concept_id: 'concept6',
      context: 'Our research focuses on deep neural networks with more than 50 layers.',
      page_number: 8
    },
    {
      document_id: 'doc3',
      concept_id: 'concept3',
      context: 'Artificial intelligence will transform every industry in the coming decade.',
      page_number: null,
      location_start: 1200,
      location_end: 1250
    },
    {
      document_id: 'doc3',
      concept_id: 'concept1',
      context: 'Machine learning is driving many of the recent advances in AI.',
      page_number: null,
      location_start: 850,
      location_end: 900
    },
    {
      document_id: 'doc4',
      concept_id: 'concept4',
      context: 'Data privacy regulations require companies to protect personal information.',
      page_number: 2
    },
    {
      document_id: 'doc5',
      concept_id: 'concept5',
      context: 'Blockchain technology enables secure peer-to-peer transactions.',
      page_number: null,
      location_start: 500,
      location_end: 550
    }
  ];

  export const conceptRelationships = [
    {
      source_id: 'concept1',
      target_id: 'concept3',
      strength: 0.9,
      relationship_type: 'subfield'
    },
    {
      source_id: 'concept2',
      target_id: 'concept6',
      strength: 0.95,
      relationship_type: 'type_of'
    },
    {
      source_id: 'concept6',
      target_id: 'concept1',
      strength: 0.85,
      relationship_type: 'subfield'
    },
    {
      source_id: 'concept1',
      target_id: 'concept4',
      strength: 0.4,
      relationship_type: 'related'
    },
    {
      source_id: 'concept3',
      target_id: 'concept5',
      strength: 0.3,
      relationship_type: 'emerging_application'
    }
  ];

  export const graphData = {
    nodes: [
      {
        id: 'concept1',
        label: 'Machine Learning',
        group: 'core',
        value: 25,
        title: 'Machine Learning\nImportance: 9.5',
        shape: 'diamond',
        color: {
          background: '#6366f1',
          border: '#4f46e5'
        }
      },
      {
        id: 'concept2',
        label: 'Neural Networks',
        group: 'method',
        value: 20,
        title: 'Neural Networks\nImportance: 8.7',
        shape: 'dot',
        color: {
          background: '#10b981',
          border: '#059669'
        }
      },
      {
        id: 'concept3',
        label: 'Artificial Intelligence',
        group: 'core',
        value: 28,
        title: 'Artificial Intelligence\nImportance: 9.2',
        shape: 'diamond',
        color: {
          background: '#6366f1',
          border: '#4f46e5'
        }
      },
      {
        id: 'concept4',
        label: 'Data Privacy',
        group: 'context',
        value: 15,
        title: 'Data Privacy\nImportance: 7.8',
        shape: 'triangle',
        color: {
          background: '#f59e0b',
          border: '#d97706'
        }
      },
      {
        id: 'concept5',
        label: 'Blockchain',
        group: 'emerging',
        value: 14,
        title: 'Blockchain\nImportance: 7.5',
        shape: 'star',
        color: {
          background: '#8b5cf6',
          border: '#7c3aed'
        }
      },
      {
        id: 'concept6',
        label: 'Deep Learning',
        group: 'method',
        value: 18,
        title: 'Deep Learning\nImportance: 8.3',
        shape: 'dot',
        color: {
          background: '#10b981',
          border: '#059669'
        }
      }
    ],
    edges: [
      {
        from: 'concept1',
        to: 'concept3',
        label: 'subfield',
        value: 5,
        arrows: 'to',
        color: {
          color: '#94a3b8',
          highlight: '#f59e0b'
        }
      },
      {
        from: 'concept2',
        to: 'concept6',
        label: 'type_of',
        value: 6,
        arrows: 'to',
        color: {
          color: '#86efac',
          highlight: '#f59e0b'
        }
      },
      {
        from: 'concept6',
        to: 'concept1',
        label: 'subfield',
        value: 4,
        arrows: 'to',
        color: {
          color: '#94a3b8',
          highlight: '#f59e0b'
        }
      },
      {
        from: 'concept1',
        to: 'concept4',
        label: 'related',
        value: 2,
        arrows: 'to',
        color: {
          color: '#94a3b8',
          highlight: '#f59e0b'
        }
      },
      {
        from: 'concept3',
        to: 'concept5',
        label: 'application',
        value: 1,
        arrows: 'to',
        color: {
          color: '#c4b5fd',
          highlight: '#f59e0b'
        }
      }
    ]
  };

  export const conceptModalData = {
    concept: {
      id: 'concept1',
      name: 'Machine Learning',
      normalized_name: 'machine learning',
      summary: 'Field of study that gives computers the ability to learn without being explicitly programmed. It focuses on the development of computer programs that can access data and use it to learn for themselves. The process of learning begins with observations or data, such as examples, direct experience, or instruction, in order to look for patterns in data and make better decisions in the future based on the examples that we provide.',
      importance_score: 9.5,
      created_at: '2023-05-16T09:00:00Z'
    },
    references: [
      {
        context: 'Machine learning algorithms build a model based on sample data to make predictions or decisions without being explicitly programmed to perform the task.',
        page_number: 5,
        documents: {
          id: 'doc1',
          title: 'Machine Learning Fundamentals',
          source_type: 'pdf',
          url: 'https://example.com/ml-fundamentals.pdf',
          uploaded_at: '2023-05-15T10:00:00Z'
        }
      },
      {
        context: 'Machine learning is driving many of the recent advances in AI, particularly in areas like computer vision and natural language processing.',
        page_number: null,
        location_start: 850,
        location_end: 900,
        documents: {
          id: 'doc3',
          title: 'The Future of AI - Blog Post',
          source_type: 'article',
          url: 'https://example.com/future-of-ai',
          uploaded_at: '2023-07-10T08:15:00Z'
        }
      },
      {
        context: 'Deep learning as a specialized form of machine learning requires more computational power but can achieve higher accuracy for complex tasks.',
        page_number: 12,
        documents: {
          id: 'doc1',
          title: 'Machine Learning Fundamentals',
          source_type: 'pdf',
          url: 'https://example.com/ml-fundamentals.pdf',
          uploaded_at: '2023-05-15T10:00:00Z'
        }
      }
    ]
  };