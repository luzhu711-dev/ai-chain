import { edges, layerColors, nodes, type MapNode } from "../data/mapData";

type NodePanelProps = {
  node: MapNode;
  onSelect: (id: string) => void;
};

function relatedNodes(nodeId: string) {
  const ids = new Set<string>();

  edges.forEach((edge) => {
    if (edge.from === nodeId) {
      ids.add(edge.to);
    }
    if (edge.to === nodeId) {
      ids.add(edge.from);
    }
  });

  return nodes.filter((node) => ids.has(node.id));
}

export function NodePanel({ node, onSelect }: NodePanelProps) {
  const related = relatedNodes(node.id);

  return (
    <aside className="panel">
      <div className="panel-header" style={{ borderColor: layerColors[node.layer] }}>
        <div>
          <div className="eyebrow">点击展开</div>
          <h2>{node.title}</h2>
        </div>
        <span className="layer-pill" style={{ background: `${layerColors[node.layer]}22`, color: layerColors[node.layer] }}>
          {node.layer}
        </span>
      </div>

      <p className="panel-lead">{node.description}</p>

      <section className="panel-section">
        <h3>价值捕获</h3>
        <p>{node.valueCapture}</p>
      </section>

      <section className="panel-section metrics-grid">
        {node.metrics.map((metric) => (
          <div key={metric.label} className="metric-card">
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </div>
        ))}
      </section>

      <section className="panel-section">
        <h3>上游依赖</h3>
        <div className="chip-list">
          {node.upstream.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="panel-section">
        <h3>下游影响</h3>
        <div className="chip-list">
          {node.downstream.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="panel-section">
        <h3>代表公司</h3>
        <div className="chip-list">
          {node.companies.map((company) => (
            <span key={company} className="chip company-chip">
              {company}
            </span>
          ))}
        </div>
      </section>

      <section className="panel-section">
        <h3>观察指标</h3>
        <ul className="signal-list">
          {node.watchpoints.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="panel-section">
        <h3>相关节点</h3>
        <div className="related-list">
          {related.map((item) => (
            <button key={item.id} className="related-button" onClick={() => onSelect(item.id)}>
              <span className="dot" style={{ background: layerColors[item.layer] }} />
              {item.title}
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
}
