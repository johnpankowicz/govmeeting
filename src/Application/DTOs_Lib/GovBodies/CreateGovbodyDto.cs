using GM.Application.DTOs.GovLocations;

namespace GM.Application.DTOs.Govbodies
{
    public class CreateGovbodyDto
    {
        public string Name { get; set; }
        public string LongName { get; set; }
        public GovLocation_Dto ParentLocation { get; set; }
    }
}
