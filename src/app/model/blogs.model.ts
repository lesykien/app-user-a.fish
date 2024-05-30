interface CategorisBlog {
  id: number;
  name: string;
}
interface BlogsRequest {
  title: string;
  category: string;
  file: File;
  content: string;
}
interface BlogDTOs {
  id: number;
  title: string;
  image: string;
  content: string;
  idBlogCategory: number;
}
interface BlogsResponse {
  id: number;
  title: string;
  image: string;
  category: string;
  data: string;
}
class _blogsGender {
  static ConvertRequest(model: BlogsRequest, file: File | undefined): FormData {
    let form = new FormData();
    form.append('title', model.title);
    form.append('file', file as File);
    form.append('content', model.content);
    form.append('blogsCategorys', model.category);
    return form;
  }
  static InitialiBlogsDTO(): BlogDTOs {
    return {
      id: 0,
      title: 'string',
      image: 'string',
      content: 'string',
      idBlogCategory: 0,
    };
  }
}

export { CategorisBlog, BlogsRequest, _blogsGender, BlogsResponse, BlogDTOs };
