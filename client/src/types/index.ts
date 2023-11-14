interface IFolder {
  id: number;
  title: string;
}

interface IModule {
  id: number;
  title: string;
  folderId: number;
}

interface ICard {
  id: number;
  moduleId: number;
  firstValue: string;
  secondValue: string;
}

export type { IFolder, IModule, ICard };
