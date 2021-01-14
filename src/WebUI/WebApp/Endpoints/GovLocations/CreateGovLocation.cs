using GM.Application.AppCore.Entities.GovLocations;
using GM.Application.DTOs.GovLocations;
using GM.Infrastructure.InfraCore.Data;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace GM.WebUI.WebApp.Endpoints.GovLocations
{
    /// <summary>
    /// 
    /// </summary>
    public class CreateGovLocationCommand : GovLocation_Dto, IRequest<int?>
    {
    }

    /// <summary>
    /// 
    /// </summary>
    public class CreateGovLocationCommandHandler : 
        IRequestHandler<CreateGovLocationCommand, int?>

    {
        private readonly ApplicationDbContext _context;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public CreateGovLocationCommandHandler(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<int?> Handle(CreateGovLocationCommand request, CancellationToken cancellationToken)
        {
            var entity = new GovLocation(request.Name, request.Type, request.Code);

            _context.GovLocations.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);
            return entity.Id;
        }

        //public CreateGovLocationCommandHandler() { }
        //public async Task<int?> Handle(CreateGovLocationCommand request, CancellationToken cancellationToken)
        //{
        //    Task task = Task.Delay(1);
        //    await task;
        //    return 1;
        //}

    }
}
