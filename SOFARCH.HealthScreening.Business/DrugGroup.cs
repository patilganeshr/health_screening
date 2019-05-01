using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class DrugGroup
    {
        private readonly DataModel.DrugGroup _drugGroup;

        public DrugGroup()
        {
            _drugGroup = new DataModel.DrugGroup();
        }

        public List<Entities.DrugGroup> GetDrugGroupIdAndGroupName()
        {
            return _drugGroup.GetDrugGroupIdAndGroupName();
        }

        public Entities.DrugGroup GetDrugGroupDetailsById(Int32 drugGroupId)
        {
            return _drugGroup.GetDrugGroupDetailsById(drugGroupId);
        }

        public Entities.DrugGroup GetDrugGroupDetailsByName(string drugGroupName)
        {
            return _drugGroup.GetDrugGroupDetailsByName(drugGroupName);
        }

        public List<Entities.DrugGroup> SearchAllDrugGroups()
        {
            return _drugGroup.SearchAllDrugGroups();
        }

        public List<Entities.DrugGroup> SearchDrugGroupsByGroupName(string groupName)
        {
            return _drugGroup.SearchDrugGroupsByGroupName(groupName);
        }

        public Int32 SaveDrugGroup(Entities.DrugGroup drugGroup)
        {
            return _drugGroup.SaveDrugGroup(drugGroup);
        }

    }
}
