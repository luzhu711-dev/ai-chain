import { useMemo, useState } from "react";
import { MapCanvas } from "./components/MapCanvas";
import { NodePanel } from "./components/NodePanel";
import { layers, nodes } from "./data/mapData";

export default function App() {
  const [selectedId, setSelectedId] = useState("accelerators");

  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedId) ?? nodes[0],
    [selectedId],
  );

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-kicker">AI 产业链全景视图</span>
          <h1>一张用来跟踪价值迁移的节点图，而不是静态行业名单</h1>
          <p>
            节点按“下游需求 → 模型平台 → 芯片内存 → 网络互联 → 制造封装 → 服务器机房 →
            电力能源”分层。点击任一节点，右侧会展开它的上游依赖、下游影响、价值捕获方式和观察指标。
          </p>
        </div>
        <div className="hero-legend">
          <h2>线的含义</h2>
          <div className="legend-list">
            <span><i className="legend demand" />需求拉动</span>
            <span><i className="legend bottleneck" />瓶颈约束</span>
            <span><i className="legend capex" />Capex 传导</span>
            <span><i className="legend pricing" />议价权/价值停留</span>
            <span><i className="legend substitute" />替代路径</span>
          </div>
        </div>
      </section>

      <section className="layer-strip">
        {layers.map((layer) => (
          <div key={layer.id} className="layer-card">
            <strong>{layer.title}</strong>
            <span>{layer.subtitle}</span>
          </div>
        ))}
      </section>

      <section className="workspace">
        <MapCanvas selectedId={selectedId} onSelect={setSelectedId} />
        <NodePanel node={selectedNode} onSelect={setSelectedId} />
      </section>
    </main>
  );
}
