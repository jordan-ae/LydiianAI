"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import { forceSimulation, forceManyBody, forceLink, forceCenter, forceCollide } from "d3-force-3d"
import type { Concept, GraphData } from "@/lib/types"

interface ForceGraphProps {
  data: GraphData
  onNodeClick: (concept: Concept) => void
  theme: string
}

export default function ForceGraph({ data, onNodeClick, theme }: ForceGraphProps) {
  const { size } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  const nodesRef = useRef<(THREE.Mesh | null)[]>([])
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [nodePositions, setNodePositions] = useState<{ [key: string]: THREE.Vector3 }>({})

  // Initialize the nodesRef array with the correct length
  useEffect(() => {
    nodesRef.current = Array(data.nodes.length).fill(null)
  }, [data.nodes.length])

  // Color schemes based on theme
  const colors = useMemo(() => {
    return {
      pdf: theme === "light" ? "#4f46e5" : "#6366f1", // Indigo
      pdfGlow: theme === "light" ? "#818cf8" : "#a5b4fc", // Lighter indigo for glow
      article: theme === "light" ? "#059669" : "#10b981", // Emerald
      articleGlow: theme === "light" ? "#34d399" : "#6ee7b7", // Lighter emerald for glow
      highlight: theme === "light" ? "#d97706" : "#f59e0b", // Amber
      highlightGlow: theme === "light" ? "#fbbf24" : "#fcd34d", // Lighter amber for glow
      link: theme === "light" ? "#94a3b8" : "#cbd5e1", // Slate for constellation lines
      linkHighlight: theme === "light" ? "#f59e0b" : "#fbbf24", // Amber for highlighted links
      textLight: "#ffffff",
      textDark: "#1f2937",
    }
  }, [theme])

  // Create simulation with nodes spread out in space
  useEffect(() => {
    if (!data.nodes.length) return

    // Initialize positions if not already set
    const initializedNodes = data.nodes.map((node) => ({
      ...node,
      x: node.x || (Math.random() - 0.5) * 100,
      y: node.y || (Math.random() - 0.5) * 100,
      z: node.z || (Math.random() - 0.5) * 100,
    }))

    const simulation = forceSimulation()
      .nodes(initializedNodes as any)
      .force("charge", forceManyBody().strength(-120))
      .force(
        "link",
        forceLink(data.links as any)
          .id((d: any) => d.id)
          .distance(50) // Distance between connected nodes
          .strength(0.3) // Strength of the link force
      )
      .force("center", forceCenter())
      .force(
        "collision",
        forceCollide().radius((d: any) => (d.importance || 0.5) * 6 + 3),
      )
      .stop()

    // Run simulation for 300 iterations for better initial layout
    for (let i = 0; i < 300; i++) {
      simulation.tick()
    }

    // Update node positions
    const positions: { [key: string]: THREE.Vector3 } = {}
    initializedNodes.forEach((node) => {
      if (node.x !== undefined && node.y !== undefined && node.z !== undefined) {
        positions[node.id] = new THREE.Vector3(node.x, node.y, node.z || 0)
      }
    })

    setNodePositions(positions)

    return () => {
      simulation.stop()
    }
  }, [data])

  // Create star shape geometry
  const createStarGeometry = (points = 5, innerRadius = 0.4, outerRadius = 1) => {
    const vertices = []
    const step = Math.PI / points

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      const angle = i * step
      vertices.push(Math.cos(angle) * radius, Math.sin(angle) * radius, 0)
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))

    // Add indices to create faces (triangles)
    const indices = []
    for (let i = 0; i < points * 2 - 2; i++) {
      indices.push(0, i + 1, i + 2)
    }
    indices.push(0, points * 2 - 1, 1)

    geometry.setIndex(indices)
    geometry.computeVertexNormals()

    return geometry
  }

  // Create constellation-like paths for links
  const createConstellationPath = (source: THREE.Vector3, target: THREE.Vector3): THREE.Vector3[] => {
    if (!source || !target) return [new THREE.Vector3(), new THREE.Vector3()]

    // Create a straight line for constellation effect
    const points = []
    const segments = 10

    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const point = new THREE.Vector3().lerpVectors(source, target, t)

      // Add slight random variation for a more natural look
      if (i > 0 && i < segments) {
        const variation = 0.5
        point.x += (Math.random() - 0.5) * variation
        point.y += (Math.random() - 0.5) * variation
        point.z += (Math.random() - 0.5) * variation
      }

      points.push(point)
    }

    return points
  }

  // Handle hover effects and animations
  useFrame((state, delta) => {
    // Slowly rotate the entire graph
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05
    }

    nodesRef.current.forEach((mesh, i) => {
      if (!mesh) return

      const node = data.nodes[i]
      if (!node) return

      // Pulsating glow effect for stars
      const pulseSpeed = 0.5 + node.importance * 0.5 // More important nodes pulse faster
      const pulseIntensity = 0.2 + node.importance * 0.3 // More important nodes pulse stronger
      const pulse = Math.sin(state.clock.elapsedTime * pulseSpeed) * pulseIntensity + 1

      // Apply pulsating effect to the star
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        mesh.material.emissiveIntensity = 0.5 + pulse * 0.5
      }

      // Hover effect
      if (hoveredNode === node.id) {
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.emissive.set(colors.highlight)
          mesh.material.emissiveIntensity = 1.5
        }
        mesh.scale.set(1.3, 1.3, 1.3)
      } else {
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.emissive.set(node.type === "pdf" ? colors.pdfGlow : colors.articleGlow)
        }
        // Keep the pulsating scale
        const baseScale = node.importance * 0.8 + 0.5
        mesh.scale.set(baseScale * pulse, baseScale * pulse, baseScale * pulse)
      }
    })
  })

  // Get all connections for a node
  const getNodeConnections = (nodeId: string) => {
    return data.links.filter((link) => link.source === nodeId || link.target === nodeId)
  }

  return (
    <group ref={groupRef}>
      {/* Constellation Links */}
      {data.links.map((link, i) => {
        const sourceNode = data.nodes.find((n) => n.id === link.source)
        const targetNode = data.nodes.find((n) => n.id === link.target)

        if (!sourceNode || !targetNode) return null

        const sourcePos = nodePositions[sourceNode.id]
        const targetPos = nodePositions[targetNode.id]

        // Add safety check for positions
        if (!sourcePos || !targetPos) {
          console.warn(`Missing positions for link ${link.source}-${link.target}`)
          return null
        }

        const linkId = `${link.source}-${link.target}`
        const isHovered = hoveredLink === linkId || hoveredNode === link.source || hoveredNode === link.target

        // Create constellation path
        const points = createConstellationPath(sourcePos, targetPos)
        if (!points || points.length < 2) {
          console.warn(`Invalid points for link ${link.source}-${link.target}`)
          return null
        }

        return (
          <group key={linkId} onPointerOver={() => setHoveredLink(linkId)} onPointerOut={() => setHoveredLink(null)}>
            {/* Main connection line */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
                  itemSize={3}
                  count={points.length}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color={isHovered ? colors.linkHighlight : colors.link}
                linewidth={2}
                opacity={isHovered ? 1 : 0.8}
                transparent={true}
              />
            </line>

            {/* Optional: Add small spheres along the line for a constellation effect */}
            {points
              .filter((_, idx) => idx % 3 === 1)
              .map((point, idx) => (
                <mesh key={`dot-${idx}`} position={point} scale={[0.3, 0.3, 0.3]}>
                  <sphereGeometry args={[0.2, 8, 8]} />
                  <meshBasicMaterial
                    color={isHovered ? colors.linkHighlight : colors.link}
                    transparent
                    opacity={isHovered ? 0.7 : 0.3} 
                  />
                </mesh>
              ))}
          </group>
        )
      })}

      {/* Star Nodes */}
      {data.nodes.map((node, i) => {
        const position = nodePositions[node.id]
        if (!position) return null

        // Get all connections for this node
        const nodeConnections = getNodeConnections(node.id)
        const hasConnections = nodeConnections.length > 0

        // Determine star properties based on node importance
        const starPoints = Math.max(4, Math.floor(node.importance * 8)) // More important = more points
        const starSize = node.importance * 4 + 2 // Base size on importance

        return (
          <group
            key={node.id}
            position={[position.x, position.y, position.z]}
            onClick={() => onNodeClick(node)}
            onPointerOver={() => setHoveredNode(node.id)}
            onPointerOut={() => setHoveredNode(null)}
          >
            {/* Star shape */}
            <mesh
              ref={(el) => {
                nodesRef.current[i] = el
              }}
              rotation={[0, 0, Math.random() * Math.PI]} // Random rotation for variety
            >
              <bufferGeometry attach="geometry" {...createStarGeometry(starPoints, 0.4, 1)} />
              <meshStandardMaterial
                color={node.type === "pdf" ? colors.pdf : colors.article}
                emissive={node.type === "pdf" ? colors.pdfGlow : colors.articleGlow}
                emissiveIntensity={0.8}
                metalness={0.3}
                roughness={0.2}
              />
            </mesh>

            {/* Glow effect */}
            <mesh scale={[starSize * 1.5, starSize * 1.5, starSize * 1.5]}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshBasicMaterial
                color={node.type === "pdf" ? colors.pdfGlow : colors.articleGlow}
                transparent
                opacity={0.15}
              />
            </mesh>

            {/* Connection count indicator */}
            {hasConnections && (
              <group position={[0, starSize * 0.8, 0]}>
                <mesh scale={[1, 1, 1]}>
                  <sphereGeometry args={[0.8, 16, 16]} />
                  <meshBasicMaterial color={theme === "light" ? "#ffffff" : "#ffffff"} transparent opacity={0.7} />
                </mesh>
                <Html position={[0, 0, 0]} center>
                  <div className="text-xs font-bold text-gray-800">{nodeConnections.length}</div>
                </Html>
              </group>
            )}

            {/* Node label - always visible but with reduced opacity when not hovered */}
            <Html
              position={[0, -starSize * 0.8, 0]}
              center
              className={`transition-opacity duration-300 ${hoveredNode === node.id ? "opacity-100" : "opacity-70"}`}
              style={{ pointerEvents: 'none', zIndex: 0 }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onNodeClick(node);
                }}
                style={{ pointerEvents: 'auto' }}
                className={`px-2 py-1 rounded-md text-sm font-medium ${
                  theme === "light" ? "bg-white/70 text-gray-800" : "bg-gray-900/70 text-white"
                } whitespace-nowrap`}
              >
                {node.name}
              </div>
            </Html>

            {/* Show keywords on hover */}
            {hoveredNode === node.id && node.keywords && (
              <Html position={[0, -starSize * 2, 0]} center>
                <div
                  className={`flex flex-wrap gap-1 max-w-[150px] justify-center ${
                    theme === "light" ? "bg-white/80" : "bg-gray-900/80"
                  } p-2 rounded-md`}
                >
                  {node.keywords.slice(0, 3).map((keyword, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-1.5 py-0.5 rounded-full ${
                        theme === "light" ? "bg-gray-200 text-gray-800" : "bg-gray-700 text-gray-200"
                      }`}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </Html>
            )}
          </group>
        )
      })}
    </group>
  )
}
