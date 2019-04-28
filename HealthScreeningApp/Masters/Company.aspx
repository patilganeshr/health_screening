<%@ Page Title="Company Master" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Company.aspx.cs" Inherits="HealthScreeningApp.Masters.Company" %>

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
                <h3>Company</h3>
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

            <div id="ViewMode">

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <div class="panel panel-default">
                            <div class="panel-header">
                                <div class="row panel-body">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <h4 class="panel-title">Company</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table id="CompanyList" class="table table-condesed">
                                        <thead>
                                            <tr>
                                                <th class="text-center">Action</th>
                                                <th class="text-center">Company Code</th>
                                                <th class="text-center">Company Name</th>
                                                <th class="text-center">Short Name</th>
                                                <th class="text-center">Address</th>
                                                <th class="text-center">State</th>
                                                <th class="text-center">City</th>
                                                <th class="text-center">Pin Code</th>
                                                <th class="text-center">GSTINNo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="panel-footer">
                                <div class="row">
                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">Page 1 of 5</div>
                                    <div class="col-lg-8 col-lg-8 col-sm-8 col-xs-12">
                                        <ul class="pagination pagination-sm pull-right">
                                            <li class="page-item">
                                                <a class="page-link" href="#" tabindex="-1">Previous</a>
                                            </li>
                                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <div id="EditMode">

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <div class="panel panel-info">

                            <div class="panel-heading">
                                <h3 class="panel-title">Company Details</h3>
                            </div>

                            <div class="panel-body">

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Company Code</label>
                                            <input type="text" id="CompanyCode" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Company Name</label>
                                            <input type="text" id="CompanyName" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Short Name</label>
                                            <input type="text" id="ShortName" class="form-control" />
                                        </div>

                                    </div>

                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Address</label>
                                            <textarea id="Address" class="form-control" rows="1"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Country</label>
                                            <select id="Country" class="form-control"></select>
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>State</label>
                                            <select id="State" class="form-control"></select>
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>City</label>
                                            <select id="City" class="form-control"></select>
                                        </div>
                                    </div>

                                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Locality</label>
                                            <input type="text" id="Locality" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Pin Code</label>
                                            <input type="text" id="PinCode" class="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Contact Person</label>
                                            <input type="text" id="ContactPerson" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Contact No.</label>
                                            <input type="text" id="ContactNo" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Email Id</label>
                                            <input type="text" id="EmailId" class="form-control" />
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


        </div>
        <!-- .container-fluid -->

    </div>
    <!-- .st-content -->

    <script type="text/javascript" src="../content/scripts/app/shared/default.js"></script>
    <script type="text/javascript" src="../content/scripts/app/Masters/company.js"></script>


</asp:Content>
