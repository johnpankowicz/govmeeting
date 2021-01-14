using GM.Application.AppCore.Entities.GovLocations;

namespace GM.Application.DTOs.GovLocations
{
    public class GovLocation_Dto
    {
        public string Name { get; set; }
        public GovlocTypes Type { get; set; }
        public string Code { get; set; }
        public GovLocation_Dto ParentLocation { get; set; }
    }
}
