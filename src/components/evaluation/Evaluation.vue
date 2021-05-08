<template>
  <div class="content-wrapper">
    <div class="row">
      <div class="col-lg-12 bg-white border m-1 pt-1 text-center">
        <h3 class="float-left"><strong>UIT Evaluation</strong></h3>
        <h3 class="">April 7, 2021</h3>
      </div>
      <div class="col-lg-4">
        <!-- USERS LIST LATEST -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Unevaluated Members</h3>

            <div class="card-tools">
              <span class="badge badge-danger">4 New Members</span>

            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body p-0">
            <ul class="users-list clearfix latest">
              <li>
                <img class="user-logo" src="../../../dist/img/user2-160x160.jpg" alt="User Image">
                <a class="users-list-name" href="#">Alexander</a>
                <span class="users-list-date">Not Yet</span>
              </li>
              <li>
                <img class="user-logo" src="../../../dist/img/user5-128x128.jpg" alt="User Image">
                <a class="users-list-name" href="#">Sarah</a>
                <span class="users-list-date">Not Yet</span>
              </li>
              <li>
                <img class="user-logo" src="../../../dist/img/user4-128x128.jpg" alt="User Image">
                <a class="users-list-name" href="#">Nora</a>
                <span class="users-list-date">Not Yet</span>
              </li>
              <li>
                <img class="user-logo" src="../../../dist/img/user3-128x128.jpg" alt="User Image">
                <a class="users-list-name" href="#">Nadia</a>
                <span class="users-list-date">Not Yet</span>
              </li>
            </ul>
            
            <!-- /.users-list -->
          </div>
          <!-- /.card-body -->
          <!-- /.card-footer -->
        </div>
        <div class="card">
              <div class="card-header text-center">
                <h3 class="card-title ">Good Performance</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body p-0">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th style="width: 10px">#</th>
                      <th>User</th>
                      <th>Score</th>
                      <th style="width: 40px">Last Periods</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1.</td>
                      <td>Nguyen Thi C</td>
                      <td>
                        110/120
                      </td>
                      <td><span class="badge bg-success">15%</span></td>
                    </tr>
                    <tr>
                      <td>2.</td>
                      <td>Mai Van Tai</td>
                      <td>
                        105/120
                      </td>
                      <td><span class="badge bg-success">14%</span></td>
                    </tr>
                    <tr>
                      <td colspan="4"><a href="/ranking">View all</a></td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>

              <div class="card-header text-center">
                <h3 class="card-title ">Warning</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body p-0">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th style="width: 10px">#</th>
                      <th>User</th>
                      <th>Score</th>
                      <th style="width: 40px">Last Periods </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1.</td>
                      <td>Pham Van E</td>
                      <td>
                        56/120
                      </td>
                      <td><span class="badge bg-danger">30%</span></td>
                    </tr>
                    <tr>
                      <td>2.</td>
                      <td>Ngo Van C</td>
                      <td>
                        65/120
                      </td>
                      <td><span class="badge bg-warning">21%</span></td>
                    </tr>
                    <tr>
                      <td colspan="4"><a href="/ranking">View all</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
        <!--/.card -->
      </div>
      <div class="col-lg-8">
        <div class="card">
          <div class="card-header row ml-0">
            <div class="col-lg-3">
              <h3 class="card-title">Members</h3>
            </div>
            <div class="search-user col-lg-7">
              <form class="form-inline ml-3">
                <div class="input-group input-group-sm">
                  <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
                  <div class="input-group-append border">
                    <button class="btn btn-navbar" type="submit">
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div class="card-tools">
              <span class="badge badge-danger">Total 12 Members</span>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body p-0">
            <ul class="users-list all-users clearfix">
              <li>
                <img class="user-logo" src="../../../dist/img/user2-160x160.jpg" alt="User Image">
                <a class="users-list-name" href="#">Alexander</a>
                <span class="users-list-date">13 Jan</span>
              </li>
              <li>
                <img class="user-logo" src="../../../dist/img/user5-128x128.jpg" alt="User Image">
                <a class="users-list-name" href="#">Sarah</a>
                <span class="users-list-date">14 Jan</span>
              </li>
              <li>
                <img class="user-logo" src="../../../dist/img/user4-128x128.jpg" alt="User Image">
                <a class="users-list-name" href="#">Nora</a>
                <span class="users-list-date">15 Jan</span>
              </li>
              <li>
                <img class="user-logo" src="../../../dist/img/user3-128x128.jpg" alt="User Image">
                <a class="users-list-name" href="#">Nadia</a>
                <span class="users-list-date">15 Jan</span>
              </li>
              <li>
                <img class="user-logo" src="../../../dist/img/user3-128x128.jpg" alt="User Image">
                <a class="users-list-name" href="#">Nadia</a>
                <span class="users-list-date">15 Jan</span>
              </li>
              <li>
                <img class="user-logo" src="../../../dist/img/user4-128x128.jpg" alt="User Image">
                <a class="users-list-name" href="#">Nora</a>
                <span class="users-list-date">15 Jan</span>
              </li>
              <li>
                <img class="user-logo" src="../../../dist/img/user5-128x128.jpg" alt="User Image">
                <a class="users-list-name" href="#">Sarah</a>
                <span class="users-list-date">14 Jan</span>
              </li>
              <li>
                <img class="user-logo" src="../../../dist/img/user2-160x160.jpg" alt="User Image">
                <a class="users-list-name" href="#">Alexander</a>
                <span class="users-list-date">13 Jan</span>
              </li>
              <li>
                <img class="user-logo" src="../../../dist/img/user3-128x128.jpg" alt="User Image">
                <a class="users-list-name" href="#">Nadia</a>
                <span class="users-list-date">15 Jan</span>
              </li>
              <li>
                <img class="user-logo" src="../../../dist/img/user4-128x128.jpg" alt="User Image">
                <a class="users-list-name" href="#">Nora</a>
                <span class="users-list-date">15 Jan</span>
              </li>
              <li>
                <img class="user-logo" src="../../../dist/img/user5-128x128.jpg" alt="User Image">
                <a class="users-list-name" href="#">Sarah</a>
                <span class="users-list-date">14 Jan</span>
              </li>
              <li>
                <img class="user-logo" src="../../../dist/img/user4-128x128.jpg" alt="User Image">
                <a class="users-list-name" href="#">Nora</a>
                <span class="users-list-date">15 Jan</span>
              </li>
            </ul>
            
            <!-- /.users-list -->
          </div>
          <!-- /.card-body -->
          <div class="card-footer text-center">
            <a href="javascript:">View All Users</a>
          </div>
          <!-- /.card-footer -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
li .user-logo{
  width:80%;
}
.latest>li img{
  border: 3px solid #03fc1c
}
.all-users > li{
  width: 10%;
}
.input-group-append .btn-navbar{
  align-self: baseline;
}
.input-group-append{
  height: 2%;
}
.search-user input{
  height: auto;
}
.search-user .input-group{
  width: 50%;
}
.text-center{
  text-align: center;
}
</style>