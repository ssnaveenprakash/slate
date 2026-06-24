import { Rule, SchematicContext, Tree, SchematicsException } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addModuleImportToRootModule, addStyleToTarget, getWorkspace, getProjectFromWorkspace } from '@angular/cdk/schematics';

export function ngAdd(options: { project?: string; styles?: boolean } = {}): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(tree);
    const projectName = options.project || Object.keys(workspace.projects)[0];
    const project = getProjectFromWorkspace(workspace, projectName);

    if (!project) {
      throw new SchematicsException(`Project ${projectName} not found.`);
    }

    if (project.projectType !== 'application') {
      throw new SchematicsException('This schematic can only be used in an Angular application project.');
    }

    addModuleImportToRootModule(tree, 'SlateModule', '@slate/ui', projectName);

    if (options.styles !== false) {
      addStyleToTarget(tree, projectName, 'styles', 'projects/slate/src/styles/styles.scss');
    }

    context.addTask(new NodePackageInstallTask());
    return tree;
  };
}
