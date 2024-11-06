import { Fragment } from "react";
import { useLocation, Navigate } from "react-router-dom";

function RouteGuard({ authenticated, user, element }) {
  const location = useLocation();
  console.log("Current location:", location.pathname);
  console.log("User role:", user?.role);
  console.log("Authenticated:", authenticated);

  // If not authenticated, redirect to /auth unless already on /auth
  if (!authenticated && !location.pathname.includes('/auth')) {
    console.log("Redirecting to /auth due to lack of authentication");
    return <Navigate to='/auth' />;
  }

  // Redirect non-instructors away from /instructor and /auth routes
  if (
    authenticated &&
    user?.role !== 'instructor' &&
    (location.pathname.includes('/instructor') || location.pathname.includes('/auth'))
  ) {
    console.log("Redirecting non-instructor user to /home");
    return <Navigate to='/home' />;
  }

  // Ensure instructors stay within instructor routes
  if (
    authenticated &&
    user?.role === 'instructor' &&
    !location.pathname.includes('instructor')
  ) {
    console.log("Redirecting instructor to /instructor");
    return <Navigate to='/instructor' />;
  }

  // Render the element if none of the conditions triggered a redirect
  return <Fragment>{element}</Fragment>;
}

export default RouteGuard;
