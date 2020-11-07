import {NodePlopAPI} from 'plop'

/* Import template helpers */
import importTemplateRenderer from './helpers/importTemplateRenderer'

/* Import component helpers */
import importComponentRenderer from './helpers/importComponentRenderer'

/* Import generators */
import TemplateGenerator from './generators/templateGenerator'
import ComponentGenerator from './generators/componentGenerator'
import ContainerGenerator from './generators/containerGenerator'
import SubcomponentGenerator from './generators/subcomponentGenerator'

export default (plop: NodePlopAPI): any => {
	plop.setHelper('importTemplateRenderer', importTemplateRenderer)
	plop.setHelper('importComponentRenderer', importComponentRenderer)

	plop.setGenerator('Template', TemplateGenerator)
	plop.setGenerator('Container', ContainerGenerator)
	plop.setGenerator('Component', ComponentGenerator)
	plop.setGenerator('Subcomponent', SubcomponentGenerator)
}
