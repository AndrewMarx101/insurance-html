  document.addEventListener("DOMContentLoaded", () => {
    // Example: FAQ toggle
    document.querySelectorAll(".faq-question").forEach(button => {
      button.addEventListener("click", () => {
        const item = button.parentElement;
        item.classList.toggle("active");
      });
    });

    // Example: hero button
    const quoteBtn = document.querySelector(".hero .btn-primary");
    if (quoteBtn) {
      quoteBtn.addEventListener("click", e => {
        e.preventDefault();
        alert("Get a Quote clicked!");
      });
    }
  });




document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("quotePopup");
  const openBtn = document.querySelector(".cta .btn-primary");
  const closeBtn = document.querySelector(".close-btn");
  const form = document.getElementById("quoteForm");

  // Open popup
  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.style.display = "flex";
  });

  // Close popup
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Close when clicking outside the box
  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });

  // Handle form submit
//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     alert("Thank you! Your quote request has been submitted.");
//     popup.style.display = "none";
//     form.reset();
//   });
});



document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });



    // document.getElementById("quoteForm").addEventListener("submit", async function(event) {
    //     event.preventDefault(); // prevent default form submission
    //     var senderName = $('#name').val();
    //     console.log(senderName)


        // const formData = {
        //     name: document.getElementById("name").value,
        //     email: document.getElementById("email").value,
        //     message: document.getElementById("details").value, // matches textarea id
        //     insuranceType: document.getElementById("insurance").value // matches API model
        // };

        // try {
        //     const response = await fetch("https://localhost:7233/api/quote", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(formData)
        //     });

        //     const result = await response.json();

        //     if (response.ok) {
        //         alert(result.responseMessage || "Quote submitted successfully!");
        //         // Optionally, close popup
        //         document.getElementById("quotePopup").style.display = "none";
        //         document.getElementById("quoteForm").reset();
        //     } else {
        //         alert(result.responseMessage || "Failed to submit quote.");
        //     }

        // } catch (err) {
        //     console.error(err);
        //     alert("Error sending request: " + err);
        // }
    // });


});



$(document).ready(function() {

    $('#quoteForm').on('submit', async function(e) {
        e.preventDefault();

        // always scope all inputs within the form
        var $form = $(this);
        var formData = {
            name: $form.find('#name').val(),
            email: $form.find('#email').val(),
            message: $form.find('#details').val(),
            insuranceType: $form.find('#insurance').val()
        };

        console.log('Sending form data:', formData); // check values

        if (!formData.name || !formData.email || !formData.insuranceType) {
            alert("Please fill out all required fields.");
            return;
        }

        try {
            const response = await fetch("https://localhost:7233/api/quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.responseMessage || "Quote submitted successfully!");
                $('#quotePopup').fadeOut();
                $form[0].reset();
            } else {
                alert(result.responseMessage || "Failed to submit quote.");
            }

        } catch (err) {
            console.error(err);
            alert("Error sending request: " + err);
        }
    });
});




