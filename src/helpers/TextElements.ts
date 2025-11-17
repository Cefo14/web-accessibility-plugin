import { GLOBALS } from '@/constants/Globals';

type Notifier = (elements: HTMLElement[]) => void;

export class TextElements {
  private nodes: Set<Node>;

  private excludedNodes: Set<Node>;

  private currentElements: HTMLElement[];

  private mutationObserver: MutationObserver;

  private observers: Set<Notifier>;

  static #instance: TextElements;

  private constructor() {
    this.nodes = new Set();
    this.excludedNodes = new Set();
    this.currentElements = [];
    this.observers = new Set();

    this.loadBodyNodes();
    this.refreshElements();
    this.mutationObserver = this.observeNodes();
    this.mutationObserver.observe(document.body, { childList: true, subtree: true });
  }

  public static get instance(): TextElements {
    if (!TextElements.#instance) {
      TextElements.#instance = new TextElements();
    }
    return TextElements.#instance;
  }

  public get elements(): HTMLElement[] {
    return this.getElements();
  }

  public get titles(): HTMLElement[] {
    const headerElements = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
    return this.getElements().filter((element) => headerElements.includes(element.tagName));
  }

  public get links(): HTMLElement[] {
    const headerElements = ['A'];
    return this.getElements().filter((element) => headerElements.includes(element.tagName));
  }

  public reload() {
    this.mutationObserver.disconnect();

    this.nodes.clear();
    this.excludedNodes.clear();
    this.currentElements = [];

    this.loadBodyNodes();
    this.mutationObserver.observe(document.body, { childList: true, subtree: true });
  }

  public subscribe = (observer: Notifier) => {
    this.observers.add(observer);
  };

  public unsubscribe = (observer: Notifier) => {
    this.observers.delete(observer);
  };

  private fetchTextNodes(element: Node): Node[] {
    const textNodes: Node[] = [];
    const excludeTagNames = ['NOSCRIPT', 'SCRIPT', 'LINK', 'STYLE'];
    const treeWalker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node.parentElement) return NodeFilter.FILTER_SKIP;
          if (excludeTagNames.includes(node.parentElement.tagName)) return NodeFilter.FILTER_SKIP;
          if (!node?.textContent?.trim?.()) return NodeFilter.FILTER_SKIP;
          return NodeFilter.FILTER_ACCEPT;
        },
      },
    );

    while (treeWalker.nextNode()) {
      const node = treeWalker.currentNode;
      if (node.parentElement) textNodes.push(node);
    }

    return textNodes;
  }

  private loadBodyNodes() {
    const textNodes = this.fetchTextNodes(document.body);
    textNodes.forEach((textNode) => {
      this.nodes.add(textNode);
    });
  }

  private addNodes(nodes: NodeList) {
    nodes.forEach((node) => {
      const textNodes = this.fetchTextNodes(node);
      textNodes.forEach((textNode) => {
        this.nodes.add(textNode);
      });
    });
  }

  private removeNodes(nodes: NodeList) {
    nodes.forEach((node) => {
      const textNodes = this.fetchTextNodes(node);
      textNodes.forEach((textNode) => {
        this.nodes.delete(textNode);
      });
    });
  }

  private observeNodes() {
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        const { addedNodes, removedNodes } = mutation;
        if (addedNodes.length > 0) this.addNodes(addedNodes);
        if (removedNodes.length > 0) this.removeNodes(removedNodes);
      });
      if (this.elemenstChanged()) this.notifyChanges();
    });
    return observer;
  }

  private getAccessibilityRootElement() {
    return document.getElementById(GLOBALS.WAP_ID);
  }

  private getExcludeNodes(): Node[] {
    if (this.excludedNodes.size > 0) return Array.from(this.excludedNodes);

    const accessibilityRoot = this.getAccessibilityRootElement();
    if (!accessibilityRoot) {
      this.excludedNodes.clear();
      return Array.from(this.excludedNodes);
    }

    const nodes = this.fetchTextNodes(accessibilityRoot);
    nodes.forEach((node) => {
      this.excludedNodes.add(node);
    });
    return nodes;
  }

  private refreshElements() {
    const nodes = new Set(this.nodes);
    this.getExcludeNodes().forEach((node) => {
      nodes.delete(node);
    });
    this.currentElements = Array
      .from(nodes)
      .map((node) => node.parentElement as HTMLElement)
      .filter(Boolean);
  }

  private elemenstChanged(): boolean {
    const currentSize = this.nodes.size - this.excludedNodes.size;
    return this.currentElements.length !== currentSize;
  }

  private getElements(): HTMLElement[] {
    if (!this.elemenstChanged()) return this.currentElements;
    this.refreshElements();
    return this.currentElements;
  }

  private notifyChanges = () => {
    this.observers.forEach((observer) => {
      const elements = this.getElements();
      observer(elements);
    });
  };
}
