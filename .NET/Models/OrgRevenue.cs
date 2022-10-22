using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class OrgRevenue
    {   
        public int Year { get; set; }
        public int Month { get; set; }
        public decimal MonthRevenueTotal { get; set; }
    }
}

