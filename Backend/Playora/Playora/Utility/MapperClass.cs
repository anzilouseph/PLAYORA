using AutoMapper;
using Playora.Entity;
using Playora.Dto;

namespace Playora.Utility
{
    public class MapperClass : Profile
    {
        public MapperClass()
        {
            CreateMap<UserMaster,UserForCreationDto > ();
            CreateMap<UserForCreationDto, UserMaster>();
        }
    }
}
