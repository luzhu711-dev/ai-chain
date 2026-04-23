import { edges, layerColors, nodes, type MapEdge, type MapNode } from "../data/mapData";

type MapCanvasProps = {
  selectedId: string;
  onSelect: (id: string) => void;
};

const viewBox = { width: 860, height: 1200 };

function isEdgeActive(edge: MapEdge, selectedId: string) {
  return edge.from === selectedId || edge.to === selectedId;
}

function isNodeConnected(nodeId: string, selectedId: string) {
  return edges.some(
    (edge) =>
      (edge.from === selectedId && edge.to === nodeId) ||
      (edge.to === selectedId && edge.from === nodeId),
  );
}

function edgeColor(edge: MapEdge) {
  switch (edge.type) {
    case "demand":
      return "#f97316";
    case "bottleneck":
      return "#dc2626";
    case "capex":
      return "#2563eb";
    case "substitute":
      return "#0f766e";
    case "pricing":
      return "#7c3aed";
    default:
      return "#64748b";
  }
}

export function MapCanvas({ selectedId, onSelect }: MapCanvasProps) {
  return (
    <div className="canvas-shell">
      <svg
        className="graph-svg"
        viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
        role="img"
        aria-label="AI 产业链节点关系图"
      >
        {edges.map((edge) => {
          const from = nodes.find((node) => node.id === edge.from) as MapNode;
          const to = nodes.find((node) => node.id === edge.to) as MapNode;
          const active = isEdgeActive(edge, selectedId);
          const x1 = from.x + 72;
          const y1 = from.y + 64;
          const x2 = to.x + 72;
          const y2 = to.y;
          const midY = (y1 + y2) / 2;
          const path = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

          return (
            <g key={`${edge.from}-${edge.to}`}>
              <path
                d={path}
                fill="none"
                stroke={edgeColor(edge)}
                strokeOpacity={active ? 0.95 : 0.22}
                strokeWidth={active ? 4 : edge.strength === "high" ? 3 : 2}
                strokeDasharray={edge.type === "substitute" ? "8 8" : undefined}
              />
              {active ? (
                <text
                  x={(x1 + x2) / 2}
                  y={midY - 6}
                  textAnchor="middle"
                  className="edge-label"
                >
                  {edge.label}
                </text>
              ) : null}
            </g>
          );
        })}

        {nodes.map((node) => {
          const selected = node.id === selectedId;
          const connected = isNodeConnected(node.id, selectedId);
          const fill = layerColors[node.layer];

          return (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              <rect
                className="node-hitbox"
                width="148"
                height="86"
                rx="22"
                onClick={() => onSelect(node.id)}
              />
              <rect
                width="148"
                height="86"
                rx="22"
                fill={selected ? fill : "#101826"}
                fillOpacity={selected ? 0.96 : connected ? 0.88 : 0.8}
                stroke={fill}
                strokeWidth={selected ? 3 : connected ? 2.5 : 1.5}
              />
              <text x="18" y="33" className="node-short" fill={selected ? "#fff7ed" : fill}>
                {node.short}
              </text>
              <text x="18" y="57" className="node-title">
                {node.title}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
