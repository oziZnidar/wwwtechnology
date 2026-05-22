<?php
    include 'db_connection.php';

    $id = $firstName = $lastName = $departmentId = $position = '';

    include 'get_employee.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Delete Employee</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
</head>
<body class="bg-light">
  <div class="container my-5">
    <div class="card border-danger shadow-sm max-width mx-auto" style="max-width: 600px;">
      <div class="card-header bg-danger text-white">
        <h3 class="card-title mb-0">Delete Employee</h3>
      </div>
      <div class="card-body">
        <p class="text-danger fw-bold">Are you sure you want to delete this employee record?</p>
        
        <div class="row mb-4">
          <div class="col-sm-12 col-md-6 col-lg-3"><strong>Name:</strong> <?php echo $firstName . ' ' . $lastName ; ?> </div>
          <div class="col-sm-12 col-md-6 col-lg-3"><strong>Position:</strong> <?php echo $position; ?></div>
          <div class="col-sm-12 col-md-6 col-lg-3"><strong>Department:</strong> 
          <?php
                try {
                    $query = "SELECT Name FROM Department WHERE Id = ?";
                    $stmt = $pdo->prepare($query);
                    $stmt->execute([$departmentId]);
                    $department = $stmt->fetch(PDO::FETCH_ASSOC);
                    echo $department ? $department['Name'] : '';
                } catch (PDOException $e) {
                    echo "Error loading department";
                }
          ?>
          </div>
        </div>

        <div class="d-flex justify-content-between">
          <a href="list.php" class="btn btn-secondary">
            <i class="bi bi-arrow-left"></i> Back to List
          </a>
          <form action="process_delete.php" method="POST" class="d-inline">
            <input type="hidden" name="id" value="<?php echo $id; ?>">
            <button type="submit" class="btn btn-danger">
              <i class="bi bi-trash-fill"></i> Confirm Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</body>
</html>