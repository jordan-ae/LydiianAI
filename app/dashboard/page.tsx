'use client'

import VisConceptGraph from '@/components/concept-graph/concept-graph';
import { useState } from 'react';
import { documentsY, documentConcepts, concepts } from './dummy';

interface Document {
  id: string;
  title: string;
  sourceType: 'pdf' | 'article';
  url: string;
  importance?: number;
  document_concepts: {
    concepts: {
      id: string;
      name: string;
    }[];
  }[];
}

const KnowledgeGraphPage = () => {

  return (
    <main className='w-full h-screen'>
      <VisConceptGraph />
    </main>
  );
};

export default KnowledgeGraphPage;