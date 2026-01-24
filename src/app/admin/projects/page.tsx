import { api } from "~/trpc/server";
import { AdminProjectList } from "../../_components/admin/AdminProjectList";

export default async function AdminProjectsPage() {
  const projects = await api.project.getAll();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
      </div>

      <AdminProjectList projects={projects} />
    </div>
  );
}

