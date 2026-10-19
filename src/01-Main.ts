// In computer science, a linked list is a linear collection of data elements whose order is not given by their physical placement in memory. Instead, each element points to the next. It is a data structure consisting of a collection of nodes which together represent a sequence.

export {};

class Node<T> {
  public next: Node<T> | null = null;
  public prev: Node<T> | null = null;

  constructor(public data: T) {}
}

// Linked lists methods
interface ILinkedList<T> {
  insertInBegin(data: T): Node<T>
  insertAtEnd(data: T): Node<T>
  deleteNode(node: Node<T>): void;
  traverse(): T[];
  size(): number;
  search?(comparator: (data:T) => boolean): Node<T> | null;
}

// Insert a Linked List
class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null = null;

  public insertInBegin(data: T): Node<T> {
    const node = new Node(data);

    if (!this.head) {
      this.head = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }

    return node;
  }

  public insertAtEnd(data: T): Node<T> {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
    } else {
      const getLast = (node: Node<T>): Node<T> => {
        return node.next ? getLast(node.next): node;
      }
      const lastNode = getLast(this.head);
      node.prev = getLast(this.head);
      lastNode.next = node;
    }

    return node;
  }

  public deleteNode(node: Node<T>): void {
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }
  }

  public search(comparator: (data: T) => boolean): Node<T> | null {
    const checkNext = (node: Node<T>): Node<T> | null => {
      if (comparator(node.data)) {
        return node;
      }
      return node.next ? checkNext(node.next): null;
    }
    return this.head ? checkNext(this.head): null;
  }

  public traverse(): T[] {
    const array: T[] = [];
    if (!this.head) {
      return array;
    }

    const addToArray = (node: Node<T>): T[] => {
      array.push(node.data);
      return node.next ? addToArray(node.next) : array;
    };

    return addToArray(this.head);
  }

  public size(): number {
    return this.traverse().length;
  }
}

interface Post {
  title: string;
  subject?: string;
}

const linkedList = new LinkedList<Post>();

// Usage

console.log(linkedList.insertInBegin({ title: 'Post 1', subject: 'Subject 1' }));
console.log(linkedList.insertInBegin({ title: 'Post 2', subject: 'Subject 2' }));
console.log(linkedList.insertInBegin({ title: 'Post 3', subject: 'Subject 3' }));
console.log(linkedList.insertInBegin({ title: 'Post 4', subject: 'Subject 4' }));
console.log(linkedList.insertAtEnd({ title: 'Post 5', subject: 'Subject 5' }));
console.log(linkedList.size());
console.log(linkedList.traverse());
