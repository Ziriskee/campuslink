import { auth, signOut } from "@/auth";
import { theme } from "@/components/Styles";
import { Avatar } from "@mui/material";
import { redirect } from "next/navigation";

// Mock user data fetched directly on the server

export default async function MyAccount() {
  const session = await auth();
  console.log(session);
  const user = {
    name: session?.user?.name || "NaN",
    email: session?.user?.email || "NaN",
    image: session?.user?.image 
  };

if (!session){
redirect("/auth/signin")
} 

  // Server Action for updating the user's name
  async function updateName(formData: FormData) {
    "use server";
    const newName = formData.get("username");
    // Handle your server-side database mutation here
    console.log("Saving new name to database:", newName);
  }

  const styles = {
    main: {
      backgroundColor: "#f8fafc",
      minHeight: "100vh",
      padding: "40px 20px",
      fontFamily: "system-ui, sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "32px",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
      border: "1px solid #e2e8f0",
      width: "100%",
      maxWidth: "450px",
      display: "flex",
      flexDirection: "column" as const,
      gap: "24px",
    },
    profileHeader: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      gap: "12px",
      textAlign: "center" as const,
    },
    avatar: {
      width: "96px",
      height: "96px",
      borderRadius: "50%",
      objectFit: "cover" as const,
      border: `3px solid ${theme.secondaryColor}`,
    },
    nameText: {
      color: theme.primaryColor,
      fontSize: "24px",
      fontWeight: "700",
      margin: "0",
    },
    emailText: {
      color: "#64748b",
      fontSize: "14px",
      margin: "0",
    },
    form: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "12px",
    },
    label: {
      color: theme.primaryColor,
      fontWeight: "600",
      fontSize: "14px",
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      borderRadius: "8px",
      border: "1px solid #cbd5e1",
      fontSize: "15px",
      outline: "none",
      marginTop: "6px",
    },
    saveBtn: {
      backgroundColor: theme.primaryColor,
      color: "#ffffff",
      padding: "12px",
      borderRadius: "8px",
      border: "none",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "8px",
    },
    divider: {
      height: "1px",
      backgroundColor: "#e2e8f0",
    },
    logoutBtn: {
      backgroundColor: "transparent",
      color: "#b91c1c",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #fca5a5",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      width: "100%",
    },
  };

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        {/* User Pic, Name, and Email Address */}
        <div style={styles.profileHeader}>
          <Avatar
            className="z-1"
            src={user.image}
            alt={user.name}
            style={styles.avatar}
          />
          <div>
            <h2 style={styles.nameText}>{session?.user?.name}</h2>
            <p style={styles.emailText}>{session?.user?.email}</p>
          </div>
        </div>

        <div style={styles.divider} />

        {/* Input field to update user's name */}
        <form action={updateName} style={styles.form}>
          <label style={styles.label}>
            Update Name
            <input
              type="text"
              name="username"
              defaultValue={user.name}
              required
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.saveBtn}>
            Save Changes
          </button>
        </form>

        <div style={styles.divider} />

        {/* Logout Button */}
        
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit" style={styles.logoutBtn}>Log Out</button>
        </form>
      </div>
    </main>
  );
}
