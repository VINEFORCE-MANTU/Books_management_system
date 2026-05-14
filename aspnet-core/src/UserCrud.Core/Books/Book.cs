using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserCrud.Books
{
    public class Book:FullAuditedEntity<int>
    {
        public string Name { get; set; }
        public string Author { get; set; }
        public int Price { get; set; }
    }

}
