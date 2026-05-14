using Abp.Application.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserCrud.Books.Dto;

namespace UserCrud.Books
{
    public interface IBookAppService : IApplicationService
    {
        Task CreateAsync(CreateBookDto input);

        Task UpdateAsync(UpdateBookDto input);

        Task DeleteAsync(int id);

        Task<BookDto> GetAsync(int id);

        Task<List<BookDto>> GetAllAsync();
    }
}