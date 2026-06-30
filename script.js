const nav = document.querySelector(".nav");
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    if (nav && menuToggle) {
      menuToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      });

      nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          nav.classList.remove("is-open");
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.setAttribute("aria-label", "Open menu");
        });
      });
    }

    document.querySelectorAll(".faq-question").forEach((button) => {
      button.addEventListener("click", () => {
        const item = button.closest(".faq-item");
        const isOpen = item.hasAttribute("open");
        item.toggleAttribute("open", !isOpen);
        button.setAttribute("aria-expanded", String(!isOpen));
        button.querySelector("span:last-child").textContent = isOpen ? "+" : "-";
      });
    });

    const earlyAccessForm = document.querySelector("#early-access-form");
    if (earlyAccessForm) {
      const waitlistEndpoint = "";

      earlyAccessForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(earlyAccessForm);
        const signup = {
          firstName: formData.get("firstName") || "",
          email: formData.get("email") || "",
          helpWith: formData.get("helpWith") || ""
        };

        if (waitlistEndpoint) {
          await fetch(waitlistEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signup)
          });
        } else {
          const subject = encodeURIComponent("AMBYL Founding Member signup");
          const body = encodeURIComponent(
            `First name: ${signup.firstName}\nEmail: ${signup.email}\nWhat they want AMBYL to help with: ${signup.helpWith}`
          );
          window.location.href = `mailto:support@ambyl.com.au?subject=${subject}&body=${body}`;
          return;
        }

        const panel = document.querySelector("#access-panel");
        const success = document.querySelector("#success-screen");
        panel.classList.add("is-complete");
        success.focus({ preventScroll: true });
      });
    }

