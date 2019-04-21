<%@ Page Title="Employee" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Employee.aspx.cs" Inherits="HealthScreeningApp.Masters.Employee" %>

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
                <h3>Employee</h3>
            </div>

            <div id="Loader" class="loader-container">
                <!--There's the container that centers it-->
                <div class="spinner-frame">
                    <!--The background-->
                    <div class="spinner-cover"></div>
                    <!--The foreground-->
                    <div class="spinner-bar"></div>
                    <!--and the spinny thing-->
                </div>
            </div>


            <!-- view mode -->
            <div id="ViewMode">

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <div class="panel panel-info">

                            <div class="panel-heading">
                                <h4 class="panel-title">List of Employees</h4>
                            </div>

                            <div class="panel-body">
                                <table id="EmployeesList" class="table table-condesed">
                                    <thead>
                                        <tr>
                                            <th class="text-center">Action</th>
                                            <th>Sr</th>
                                            <th>Employee Name</th>
                                            <th>Gender</th>
                                            <th>Contact No.</th>
                                            <th>Email Id</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
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

            <!-- edit panel -->

            <div id="EditMode">

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <div class="panel panel-info">

                            <div class="panel-heading">
                                <h3 class="panel-title">Employee Details</h3>
                            </div>

                            <div class="panel-body">

                                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>First Name</label>
                                            <input type="text" id="FirstName" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Middle Name</label>
                                            <input type="text" id="MiddleName" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Last Name</label>
                                            <input type="text" id="LastName" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Date of Birth</label>
                                            <input type="text" id="DateOfBirth" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label for="Gender">Gender</label>
                                        <div class="form-group form-group-sm">
                                            <label class="lable-tick">
                                                <input type="radio" id="Male" class="label-radio" name="Gender" value="Male" />
                                                <span class="label-text">Male</span>
                                            </label>
                                            <label class="lable-tick">
                                                <input type="radio" id="Female" class="label-radio" name="Gender" value="Female" />
                                                <span class="label-text">Female</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Address</label>
                                            <textarea id="Address" class="form-control" rows="3"></textarea>
                                        </div>
                                    </div>


                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Email Id</label>
                                            <input type="text" id="EmailId" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Contact No. 1</label>
                                            <input type="text" id="ContactNo1" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Contact No. 2</label>
                                            <input type="text" id="ContactNo2" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Mobile No. 1</label>
                                            <input type="text" id="MobileNo1" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Mobile No. 2</label>
                                            <input type="text" id="MobileNo2" class="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Employer Name</label>
                                            <select id="Employer" class="form-control"></select>
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>PAN No.</label>
                                            <input type="text" id="PANNo" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Department</label>
                                            <select id="Department" class="form-control"></select>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

    <script type="text/javascript" src="../content/scripts/app/shared/default.js"></script>
    <script type="text/javascript" src="../content/scripts/app/Masters/employee.js"></script>

</asp:Content>
