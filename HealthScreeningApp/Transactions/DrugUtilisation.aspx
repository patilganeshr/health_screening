<%@ Page Title="Drug Utilisation" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="DrugUtilisation.aspx.cs" Inherits="HealthScreeningApp.Transactions.DrugUtilisation" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cpMaster" runat="server">

    <div class="action-toolbar">

        <a href="#" id="AddNewEmployee"><i class="fa fa-plus fa-fw"></i>New</a>
        <a href="#" id="ShowEmployeeList"><i class="fa fa-list fa-fw"></i>List</a>
        <a href="#" id="ViewEmployee"><i class="fa fa-eye fa-fw"></i>View</a>
        <a href="#" id="EditEmployee"><i class="fa fa-edit fa-fw"></i>Edit</a>
        <a href="#" id="SaveEmployee"><i class="fa fa-save fa-fw"></i>Save</a>
        <a href="#" id="DeleteEmployee"><i class="fa fa-remove fa-fw"></i>Delete</a>
        <a href="#" id="PrintEmployeeList"><i class="fa fa-print fa-fw"></i>Print</a>
        <a href="#" id="FilterEmployee"><i class="fa fa-filter fa-fw"></i>Filter</a>
        <a href="#" id="ExportEmpoyeeList"><i class="fa fa-cog fa-fw"></i>Export</a>

    </div>

    <div class="st-content">

        <div class="container-fluid">

            <div class="page-header">
                <h3>Petty Cash Expense</h3>
            </div>

            <div id="Loader" class="loader-container" style="display: none;">
                <!--There's the container that centers it-->
                <div class="spinner-frame">
                    <!--The background-->
                    <div class="spinner-cover"></div>
                    <!--The foreground-->
                    <div class="spinner-bar"></div>
                    <!--and the spinny thing-->
                </div>

            </div>
            <!-- .loader-container -->

            <div id="EditMode">

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <div class="panel panel-info">

                            <div class="panel-heading">
                                <h3 class="panel-title"></h3>
                            </div>

                            <div class="panel-body">
                            
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Doc No.</label>
                                            <input type="text" id="DocNo" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Date</label>
                                                        <div class="input-group date input-group-md" id="UtilisationDateDatePicker">
                                                            <input type="text" id="UtilisationDate" class="form-control" />
                                                            <span class="input-group-addon">
                                                                <i class="fa fa-calendar"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                    <div class="col-lg-1 col-md-1 col-sm-3 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Emp Code</label>
                                            <input type="text" id="EmployeeCode" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Employee Name</label>
                                            <input type="text" id="EmployeeName" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-4 col-md-4 col-sm-3 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Company Name</label>
                                            <input type="text" id="CompanyName" class="form-control" />
                                        </div>
                                    </div>

                                </div>

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Pick Up From</label>
                                            <input type="text" id="PickUpFrom" class="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Search By Drug Name Or Drug Code</label>
                                            <input type="text" id="SearchDrugName" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="pull-right">
                                        <h3 class="text-deep-orange-A200">Total Amount Rs. <span id="TotalBillAmount"></span>80.90</h3>
                                    </div>
                                </div>

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="table-responsive">
                                        <table id="DrugUtilisationList" class="table table-condensed">
                                            <thead>
                                                <tr>
                                                    <th class="text-center">Action</th>
                                                    <th class="text-center">Code</th>
                                                    <th class="text-center">Name</th>
                                                    <th class="text-center">Bal. Stock</th>
                                                    <th class="text-center">Qty</th>
                                                    <th class="text-center">Rate</th>
                                                    <th class="text-center">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                    <tr>
                                                        <td class="text-center">Remove</td>
                                                        <td class="text-center">211</td>
                                                        <td class="text-center">Cipla Eye Drop</td>
                                                        <td class="text-center">20</td>
                                                        <td class="text-center">1</td>
                                                        <td class="text-center">10.50</td>
                                                        <td class="text-center">10.50</td>
                                                    </tr>
                                                <tr>
                                                    <td class="text-center">Remove</td>
                                                    <td class="text-center">123</td>
                                                    <td class="text-center">Allegra 120mg Tab</td>
                                                    <td class="text-center">150</td>
                                                    <td class="text-center">10</td>
                                                    <td class="text-center">7.04</td>
                                                    <td class="text-center">70.40</td>
                                                </tr>
                                            </tbody>
                                            <tfoot></tfoot>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        
                        </div>

                    
                    </div>

                
                </div>

            </div>

        </div>

    </div>

</asp:Content>
