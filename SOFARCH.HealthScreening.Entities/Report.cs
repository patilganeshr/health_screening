using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;

namespace SOFARCH.HealthScreening.Entities
{
    public class Report
    {
        public string ReportPath { get; set; }
        public string DirectoryPath { get; set; }
        public string FileStoragePath { get; set; }
        public string RecordSelectionFormula { get; set; }
        public ArrayList Parameters { get; set; }
    }
}
