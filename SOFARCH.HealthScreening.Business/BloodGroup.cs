using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class BloodGroup
    {
        private readonly DataModel.BloodGroup _bloodGroup;

        public BloodGroup()
        {
            _bloodGroup = new DataModel.BloodGroup();
        }

        public List<Entities.BloodGroup> GetAllBloodGroups()
        {
            return _bloodGroup.GetAllBloodGroups();
        }

    }
}
