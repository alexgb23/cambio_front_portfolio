import {
  Braces,
  FileCode2,
  FileJson2,
  FileText,
  Folder,
  FolderOpen,
  Minus,
  Plus,
  Settings2,
} from "lucide-react";
import styles from "./ProjectFoldersModule.module.css";

function resolveNodeMeta(node) {
  if (node.type === "folder") return { Icon: Folder, kind: "folder" };
  if (node.name === ".env" || node.name === ".env.example") {
    return { Icon: Braces, kind: "env" };
  }
  if (node.name.endsWith(".blade.php")) {
    return { Icon: FileCode2, kind: "blade" };
  }
  if (node.name.endsWith(".php")) return { Icon: FileCode2, kind: "php" };
  if (node.name.endsWith(".json")) return { Icon: FileJson2, kind: "json" };
  if (node.name.endsWith(".md")) return { Icon: FileText, kind: "md" };
  if (node.name.toLowerCase().includes("docker")) {
    return { Icon: Settings2, kind: "docker" };
  }
  return { Icon: Braces, kind: "default" };
}

function FileRow({ node, depth = 0 }) {
  const { Icon, kind } = resolveNodeMeta(node);

  return (
    <li className={styles.treeItem} style={{ "--depth": depth }}>
      <div
        className={`${styles.treeRow} ${styles.treeFileRow} ${
          styles[`kind${kind[0].toUpperCase()}${kind.slice(1)}`] || ""
        }`}
      >
        <span className={styles.treeIndent} />
        <span className={styles.treeIcon}>
          <Icon size={14} />
        </span>
        <span className={styles.treeLabel}>{node.name}</span>
      </div>
    </li>
  );
}

function FolderNode({ node, depth = 0, defaultOpen = false }) {
  if (!node.children?.length) {
    return <FileRow node={node} depth={depth} />;
  }

  return (
    <li className={styles.treeItem} style={{ "--depth": depth }}>
      <details className={styles.treeDetails} open={defaultOpen}>
        <summary className={`${styles.treeRow} ${styles.kindFolder}`}>
          <span className={styles.treeToggle}>
            <Plus size={12} className={styles.treePlus} />
            <Minus size={12} className={styles.treeMinus} />
          </span>

          <span className={styles.treeIconWrap}>
            <Folder size={14} className={styles.treeFolderClosed} />
            <FolderOpen size={14} className={styles.treeFolderOpen} />
          </span>

          <span className={styles.treeLabel}>{node.name}</span>
        </summary>

        <ul className={styles.treeList}>
          {node.children.map((child, index) => (
            <FolderNode
              key={`${node.name}-${child.name}-${index}`}
              node={child}
              depth={depth + 1}
              defaultOpen={depth < 1}
            />
          ))}
        </ul>
      </details>
    </li>
  );
}

function ProjectFoldersModule({
  title = "Estructura del Proyecto",
  tree = [],
  badge = "Proyecto",
  className = "",
}) {
  return (
    <article className={`${className} ${styles.treeModule}`}>
      <div className={styles.treeHeader}>
        <h3>{title}</h3>
        <span className={styles.fileBadge}>{badge}</span>
      </div>

      <div className={styles.treeShell}>
        <div className={`${styles.treePanel} ${styles.customScroll}`}>
          {tree.length ? (
            <ul className={styles.treeList}>
              {tree.map((node, index) => (
                <FolderNode
                  key={`${node.name}-${index}`}
                  node={node}
                  depth={0}
                  defaultOpen
                />
              ))}
            </ul>
          ) : (
            <div className={styles.emptyState}>
              No hay estructura disponible.
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectFoldersModule;
