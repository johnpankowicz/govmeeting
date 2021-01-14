using GM.Application.DTOs.GovLocations;
using GM.Infrastructure.InfraCore.Data;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using GM.Application.AppCore.Entities.GovLocations;

namespace GM.WebUI.WebApp.Endpoints.GovLocations
{
    /// <summary>
    /// 
    /// </summary>
    public class GetMyLocalGovLocationWithGovbodies_Query : IRequest<GovLocationWithGovbodies_Dto>
    {
    }

    /// <summary>
    /// 
    /// </summary>
    public class GetMyLocalGovLocationWithGovbodies_QueryHandler :
        IRequestHandler<GetMyLocalGovLocationWithGovbodies_Query, GovLocationWithGovbodies_Dto>
    {

        private readonly ApplicationDbContext _context;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public GetMyLocalGovLocationWithGovbodies_QueryHandler(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<GovLocationWithGovbodies_Dto> Handle(GetMyLocalGovLocationWithGovbodies_Query request, CancellationToken cancellationToken)
        {

            //var specification = new GovLocationWithGovbodies_Spec(request.UserName);
            //var orders = await _orderRepository.ListAsync(specification);

            //return orders.Select(o => new OrderViewModel
            //{
            //    OrderDate = o.OrderDate,
            //    OrderItems = o.OrderItems?.Select(oi => new OrderItemViewModel()
            //    {
            //        PictureUrl = oi.ItemOrdered.PictureUri,
            //        ProductId = oi.ItemOrdered.CatalogItemId,
            //        ProductName = oi.ItemOrdered.ProductName,
            //        UnitPrice = oi.UnitPrice,
            //        Units = oi.Units
            //    }).ToList(),
            //    OrderNumber = o.Id,
            //    ShippingAddress = o.ShipToAddress,
            //    Total = o.Total()
            //});



            Task task = Task.Delay(1);
            await task;
            GovLocationWithGovbodies_Dto d = new GovLocationWithGovbodies_Dto();
            return d;
        }

    }

}
