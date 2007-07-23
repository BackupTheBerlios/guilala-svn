package net.transformatorhuis.guilala.polaroid;

//import java.net.URL;
import javax.swing.JApplet;

public class Stage extends JApplet {
	private static final long serialVersionUID = 1L;

	public void init(){
		System.out.println("class: Stage applet v.01");
		//getContentPane().add(canvas);
		//getContentPane();
		//toString();
		
		//URL url = new URL(getCodeBase(), "barChart.svg");
		//System.out.println("url " + url);
	
		Svg s1 = new Svg();
		s1.createSvg("./barChart.svg");
		getContentPane().add(s1.canvas);
	}
	
	public void browserResize(int bWidth, int bHeight){
		System.out.println("Browser resize-> " + bWidth + ", " + bHeight);
		Global.stageW = bWidth;
		Global.stageH = bHeight;
	}
}
