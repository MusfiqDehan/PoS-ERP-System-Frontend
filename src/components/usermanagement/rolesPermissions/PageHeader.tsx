import PageHeaderActions from "./PageHeaderActions";
import PageHeaderIntro from "./PageHeaderIntro";

export default function PageHeader() {
  return (
    <div className="roles-permissions-page-header">
      <PageHeaderIntro />
      <PageHeaderActions />
    </div>
  );
}
