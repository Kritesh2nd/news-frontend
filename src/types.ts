import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Options {
  headers?: | HttpHeaders | { [header: string]: string | string[]; };
  body?:{};
  observe?: 'body';
  context?: HttpContext;
  contentType?:'application/json';
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      }
    | {
    };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface UserDetails{
  id?: number,
  email: string,
  password: string,
}

export interface User{
  userId?: number,
  username?: string,
  email?: string,
  firstName?: string,
  lastName?: string,
  password?: string,
  role?: string[],
}

export interface UserLogin{
  email: string,
  password: string,
}

export interface UserSignUp{
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
}

export interface Article{
  articleId: number,
  title: string,
  authorFirstName: string,
  authorLastName: string,
  shortContent?: string,
  content?: string,
  imageUrl?: string,
  publishedDate?: string,
  category?:string,
  updateImage?:false,
}

export interface ArticleRequest{
  firstDate?: string;
  secondDate?: string;
  category?: string;
  pagination?: boolean;
  pageNumber?: number;
  pageSize?: number;
}

export interface Products {
  items: Product[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface Product {
  id?: number;
  price: string;
  name: string;
  image: string;
  rating: number;
}

export interface PaginationParams {
  [param: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
  page: number;
  perPage: number;
}

export interface Category{
  categoryId: number,
  categoryName: string,
}

export const dummyArticle: Article = {
  articleId: 0,
  title: '',
  authorFirstName: '',
  authorLastName: '',
  shortContent: '',
  content: '',
  imageUrl: '',
  publishedDate: ''
}


export const headlines: string[] = [
  "Cholera outbreak in Lalitpur",
  "Nepal exit Asia Cup",
  "Araniko Highway upgrade",
  "Decay in internal democracy",
  "Chhurpi as export",
  "Yoga"
]


export interface TokenResponse{
  token: string,
  roles: string[],
  expiresIn: number,
}


export interface BasicResponse{
  message: string,
  success: boolean,
}


export class UserAuth {

  constructor(
    public email: string,
    public password: string,
    public firstName?: string,
    public lastName?: string,
  ) {  }

}

export interface Link {
  title: string,
  link: string,
  params?: LinkParamterts[],
}

export interface LinkParamterts {
  name: string,
  value: string,
}
export const sideBar: Link[] = [
  {
    title:'Create Article',
    link:'dashboard',
    params: [
      {
        name:"page",
        value:"createArticle"
      }
    ]
  },
  {
    title:'Read Article',
    link:'dashboard',
    params: [
      {
        name:"page",
        value:"readArticle"
      }
    ]
  },

]

export interface CreateArticle {
  articleId?: number,
  title: string,
  shortContent: string,
  content?: string,
  publishedDate?: string,
  category: string,
  updateImage?:false,
}



// {
//   "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrcml0ZXNoQGdtYWlsLmNvbSIsImlhdCI6MTcyMjQyNDY5MywiZXhwIjoxNzIyNDI4MjkzfQ.nti5T3jkHYnE7XJpL6x_DON7OT12Ex57fIOpyKc02uk",
//   "roles": [
//       "editor",
//       "reader",
//       "admin"
//   ],
//   "expiresIn": 3600000
// }


/*









https://kathmandupost.com/
"all",
"sports",
"politics",
"national",
"economy",
"business",
"entertainment",
"health"

*/