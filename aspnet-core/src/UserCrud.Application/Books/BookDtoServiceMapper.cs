using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Books.Dto;

namespace UserCrud.Books
{
    public class BookDtoServiceMapper:Profile
    {
        public BookDtoServiceMapper()
        {
            CreateMap<Book, BookDto>();

            CreateMap<CreateBookDto, Book>();

            CreateMap<UpdateBookDto, Book>();
        }
    }
}
