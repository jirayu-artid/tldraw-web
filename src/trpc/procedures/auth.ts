import { withAuth } from "@/trpc/middleware/with-auth";
import { procedure } from "@/trpc/trpc";

const authProcedure = procedure.use(withAuth);

export default authProcedure;
