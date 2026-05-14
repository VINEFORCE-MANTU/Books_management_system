using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserCrud.Books.Dto
{
    public class CreateBookDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Author { get; set; }

        public int Price { get; set; }
    }
}
