using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.ObjectMapping;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserCrud.Books.Dto;

namespace UserCrud.Books
{
    public class BookdtoServiceModule : ApplicationService, IBookAppService
    {
        private readonly IRepository<Book, int> _bookRepository;
        private readonly IObjectMapper _objectMapper;

        public BookdtoServiceModule
        (
            IRepository<Book, int> bookRepository,
            IObjectMapper objectMapper
        )
        {
            _bookRepository = bookRepository;
            _objectMapper = objectMapper;
        }

      
        public async Task CreateAsync(CreateBookDto input)
        {
            var book = _objectMapper.Map<Book>(input);

            await _bookRepository.InsertAsync(book);
        }

      
        public async Task UpdateAsync(UpdateBookDto input)
        {
            var book = await _bookRepository.GetAsync(input.Id);

            _objectMapper.Map(input, book);

            await _bookRepository.UpdateAsync(book);
        }

       
        public async Task DeleteAsync(int id)
        {
            await _bookRepository.DeleteAsync(id);
        }

       
        public async Task<BookDto> GetAsync(int id)
        {
            var book = await _bookRepository.GetAsync(id);

            return _objectMapper.Map<BookDto>(book);
        }

      
        public async Task<List<BookDto>> GetAllAsync()
        {
            var books = await _bookRepository.GetAllListAsync();

            return _objectMapper.Map<List<BookDto>>(books);
        }
    }
}