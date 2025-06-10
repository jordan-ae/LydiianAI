// components/ConceptModal.js
import { supabase } from '@/lib/supabase-client';
import { useEffect, useState } from 'react';

interface Document {
  id: string;
  title: string;
  source_type: string;
  url: string;
  uploaded_at: string;
}

interface Reference {
  context: string;
  page_number?: number;
  location_start?: number;
  location_end?: number;
  documents: Document;
}

interface Concept {
  id: string;
  name: string;
  normalized_name?: string;
  summary?: string;
}

interface ConceptModalProps {
  conceptId?: string;
  onClose: () => void;
}

const ConceptModal = ({ conceptId, onClose }: ConceptModalProps) => {
  const [concept, setConcept] = useState<Concept | null>(null);
  const [references, setReferences] = useState<Reference[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConceptData = async () => {
      setIsLoading(true);
      
      // Fetch concept details
      const { data: conceptData } = await supabase
        .from('concepts')
        .select('*')
        .eq('id', conceptId)
        .single();
      
      // Fetch document references with more context
      const { data: refData } = await supabase
        .from('document_concepts')
        .select(`
          context, 
          page_number,
          location_start,
          location_end,
          documents (id, title, source_type, url, uploaded_at)
        `)
        .eq('concept_id', conceptId)
        .order('created_at', { ascending: false });
      setConcept(conceptData);
      setReferences((refData || []).map(ref => ({
        ...ref,
        documents: ref.documents[0]
      })));
      setIsLoading(false);
    };

    if (conceptId) fetchConceptData();
  }, [conceptId]);

  const formatDocumentLink = (doc: Document, ref: Reference) => {
    if (doc.source_type === 'pdf' && ref.page_number) {
      return `${doc.url}#page=${ref.page_number}`;
    }
    if (doc.source_type === 'article' && ref.location_start) {
      return `${doc.url}#:~:text=${encodeURIComponent(ref.context.substring(0, 30))}`;
    }
    return doc.url;
  };

  if (!conceptId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-110 p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {isLoading ? 'Loading...' : concept?.name}
              </h2>
              {concept?.normalized_name && concept.normalized_name !== concept.name && (
                <p className="text-gray-400 text-sm">
                  Also known as: {concept.normalized_name}
                </p>
              )}
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Summary</h3>
                <div className="prose prose-invert max-w-none bg-gray-700 p-4 rounded-lg">
                  {concept?.summary || 'No summary available.'}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Appears in {references.length} document{references.length !== 1 ? 's' : ''}
                </h3>
                
                <div className="space-y-3">
                  {references.length > 0 ? (
                    references.map((ref, i) => (
                      <div key={i} className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-white">
                            {ref.documents.title}
                          </h4>
                          <span className="text-xs px-2 py-1 bg-gray-600 rounded-full text-gray-300">
                            {ref.documents.source_type.toUpperCase()}
                          </span>
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-3 italic">
                          "{ref.context.length > 200 ? `${ref.context.substring(0, 200)}...` : ref.context}"
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <a
                            href={formatDocumentLink(ref.documents, ref)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Open reference
                          </a>
                          
                          <span className="text-gray-400 text-xs">
                            {new Date(ref.documents.uploaded_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400 italic">No document references found.</div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConceptModal;