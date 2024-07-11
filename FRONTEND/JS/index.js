document.addEventListener("DOMContentLoaded", () => {
  const API_HOST = "http://localhost:5000/";
  //Create user
  const createUserForm = document.getElementById("createUserForm");
  const editFormUser = document.getElementById("editFormUser");


  if(createUserForm != null){
    createUserForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(createUserForm);
        const data = {
          name: formData.get("nombre"),
          surname: formData.get("apellido"),
          gender: formData.get("genero"),
          birthday: formData.get("fechaNacimiento"),
          mail: formData.get("email"),
          national_document_identity: formData.get("documentoNacionalIdentidad"),
        };
    
        console.log("Estos son los datos obtenidos", data);
    
        const response = await fetch(`${API_HOST}users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
        const result = await response.json();
        console.log("Este es el resultado", result);
        alert("User generated succesfully.");
    
        createUserForm.reset();
      });
  }


  editFormUser.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(editFormUser);
    const userId = formData.get('editID');
    console.log(userId);

    const data = {
      name: formData.get("nombre"),
      surname: formData.get("apellido"),
      mail: formData.get("email"),
    };

    const response = await fetch(`${API_HOST}users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Este es el dato modificado", result);
    alert(result.message);
    editarUsuarioForm.reset();
  });
});
