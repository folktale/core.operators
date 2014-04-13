bin        = $(shell npm bin)
lsc        = $(bin)/lsc
browserify = $(bin)/browserify
jsdoc      = $(bin)/jsdoc
uglify     = $(bin)/uglifyjs
VERSION    = $(shell node -e 'console.log(require("./package.json").version)')


dist:
	mkdir -p dist

dist/core.operators.umd.js: dist
	$(browserify) lib/index.js --standalone folktale.core.operators > $@

dist/core.operators.umd.min.js: dist/core.operators.umd.js
	$(uglify) --mangle - < $^ > $@

# ----------------------------------------------------------------------
bundle: dist/core.operators.umd.js

minify: dist/core.operators.umd.min.js

documentation: 
	$(jsdoc) --configure jsdoc.conf.json
	ABSPATH=$(shell cd "$(dirname "$0")"; pwd) $(MAKE) clean-docs

clean-docs:
	perl -pi -e "s?$$ABSPATH/??g" ./docs/*.html

clean:
	rm -rf dist build

test:
	$(lsc) test/tap.ls

package: documentation bundle minify
	mkdir -p dist/core.operators-$(VERSION)
	cp -r docs dist/core.operators-$(VERSION)
	cp -r lib dist/core.operators-$(VERSION)
	cp dist/*.js dist/core.operators-$(VERSION)
	cp package.json dist/core.operators-$(VERSION)
	cp README.md dist/core.operators-$(VERSION)
	cp LICENCE dist/core.operators-$(VERSION)
	cd dist && tar -czf core.operators-$(VERSION).tar.gz core.operators-$(VERSION)

publish: clean
	npm install
	npm publish

bump:
	node tools/bump-version.js $$VERSION_BUMP

bump-feature:
	VERSION_BUMP=FEATURE $(MAKE) bump

bump-major:
	VERSION_BUMP=MAJOR $(MAKE) bump

.PHONY: test bump bump-feature bump-major publish package clean documentation
