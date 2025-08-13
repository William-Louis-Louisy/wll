export interface IStack {
  _id: string;
  name: string;
  icon: string;
}

export interface ITask {
  _id: string;
  name: string;
  name_fr: string;
  description: string;
  description_fr: string;
}

export interface IFeature {
  _id: string;
  name: string;
  name_fr: string;
  description: string;
  description_fr: string;
}

export interface Project {
  _id: string;
  name: string;
  date: string;
  image?: string;
  images: string[];
  stack: IStack[];
  description?: string;
  description_fr?: string;
  short_description: string;
  short_description_fr: string;
  tasks?: ITask[];
  features?: IFeature[];
  link?: string;
  github?: string[];
}
