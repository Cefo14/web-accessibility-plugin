import { GLOBALS } from '@/constants/Globals';

export class TextElements {
  private nodes: Set<Node>;
  private excludedNodes: Set<Node>;
  private currentElements: HTMLElement[];
  private observer: MutationObserver;

  static #instance: TextElements;

  private constructor() {
    this.nodes = new Set();
    this.excludedNodes = new Set();
    this.currentElements = [];

    this.loadBodyNodes();
    this.observer = this.observeNodes();
    this.observer.observe(document.body, { childList: true, subtree: true });
  }

  public static get instance(): TextElements {
    if (!TextElements.#instance) {
      TextElements.#instance = new TextElements();
    }
    return TextElements.#instance;
  }

  get elements(): HTMLElement[] {
    return this.getElements();
  }

  get titles(): HTMLElement[] {
    const headerElements = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
    return this.getElements().filter((element) => {
      return headerElements.includes(element.tagName);
    });
  }

  get links(): HTMLElement[] {
    const headerElements = ['A'];
    return this.getElements().filter((element) => {
      return headerElements.includes(element.tagName);
    });
  }

  public reload() {
    this.observer.disconnect();

    this.nodes.clear();
    this.excludedNodes.clear();
    this.currentElements = [];

    this.loadBodyNodes();
    this.observer.observe(document.body, { childList: true, subtree: true });
  }

  private fetchNodes(element: Node): Node[] {
    const textElements: Node[] = [];
    const excludeTagNames = ['NOSCRIPT', 'SCRIPT', 'LINK', 'STYLE'];
    const treeWalker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node.parentElement) return NodeFilter.FILTER_SKIP;
          if (excludeTagNames.includes(node.parentElement.tagName)) return NodeFilter.FILTER_SKIP;
          if(!node?.textContent?.trim?.()) return NodeFilter.FILTER_SKIP;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    while (treeWalker.nextNode()) {
      const node = treeWalker.currentNode;
      if(node.parentElement) textElements.push(node);
    }

    return textElements;
  };

  private loadBodyNodes() {
    const textNodes = this.fetchNodes(document.body);
    textNodes.forEach((textNode) => {
      this.nodes.add(textNode);
    });
  }

  private addNodes(nodes: NodeList) {
    nodes.forEach((node) => {
      const textNodes = this.fetchNodes(node);
      textNodes.forEach((textNode) => {
        this.nodes.add(textNode);
      });
    });
  }

  private removeNodes(nodes: NodeList) {
    nodes.forEach((node) => {
      const textNodes = this.fetchNodes(node);
      textNodes.forEach((textNode) => {
        this.nodes.delete(textNode);
      });
    });
  }

  private observeNodes() {
    const observer =  new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        const { addedNodes, removedNodes } = mutation;
        if (addedNodes.length > 0) this.addNodes(addedNodes);
        if (removedNodes.length > 0) this.removeNodes(removedNodes);
      }
    });
    return observer;
  }

  private getAccessibilityRootElement() {
    return document.getElementById(GLOBALS.ACCESSIBILITY_ID);
  }

  private getExcludeNodes(): Node[] {
    if (this.excludedNodes.size > 0) return Array.from(this.excludedNodes);

    const accessibilityRoot = this.getAccessibilityRootElement();
    if (!accessibilityRoot) {
      this.excludedNodes.clear();
      return Array.from(this.excludedNodes);
    }

    const nodes = this.fetchNodes(accessibilityRoot);
    nodes.forEach((node) => {
      this.excludedNodes.add(node);
    });
    return nodes;
  }

  private refreshElements () {
    const nodes = new Set(this.nodes);
    this.getExcludeNodes().forEach((node) => {
      nodes.delete(node);
    });
    this.currentElements = Array
      .from(nodes)
      .map((node) => node.parentElement as HTMLElement);
  }

  private getElements(): HTMLElement[] {
    const currentSize = this.nodes.size - this.excludedNodes.size;
    if (this.currentElements.length === currentSize) return this.currentElements;
    this.refreshElements();
    return this.currentElements;
  }
}
